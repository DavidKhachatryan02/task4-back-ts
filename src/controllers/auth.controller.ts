import { Request, Response, NextFunction } from "express";
import { compare, hash } from "bcrypt";
import { generateToken, generateRefreshToken, verifyAuthToken } from "../utils";
import { JWT_EXPIRE_TIME, BCRYPT_SALT_ROUNDS } from "../constants/config";
import ROLES from "../constants/roles";
import {
  InvalidCredentialsError,
  NoSuchRole,
  UnAuthorizedError,
} from "../errors/auth";
import { models } from "../services/sequelize";

const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.user.data;

    const userData = await models.User.findOne({
      where: { email },
      attributes: { exclude: ["password", "refreshToken", "accessToken"] },
      include: {
        model: models.Role,
        attributes: ["name", "id"],
        through: { attributes: [] },
      },
    });

    if (!userData) return next(new InvalidCredentialsError());

    res.status(200).json(userData);

    next(null);
  } catch (e) {
    console.error(`[auth controller]: getMe error => ${e}`);

    next(e);
  }
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, name, userRole } = req.body;
    const hashedPassword = await hash(password, BCRYPT_SALT_ROUNDS);
    const refreshToken = generateRefreshToken();
    const accessToken = generateToken(email);

    const roleName: string = userRole.toUpperCase();

    const roleId: number = ROLES[roleName as keyof typeof ROLES].id;

    const role = await models.Role.findOne({ where: { id: roleId } });

    if (!role) {
      return next(new NoSuchRole());
    }

    const user = await models.User.create({
      email,
      name,
      refreshToken,
      accessToken,
      password: hashedPassword,
    });

    await models.UsersOnRoles.create({
      userId: user.dataValues.id,
      roleId: role.dataValues.id,
    });

    res
      .status(200)
      .json({ refreshToken, accessToken, ExpireTime: JWT_EXPIRE_TIME });
    next(null);
  } catch (e) {
    console.error(`[auth controller]: register error => ${e}`);
    next(e);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.user;
    const userPassword = req.body.password;

    const isPasswordValid = await compare(userPassword, email);

    if (!isPasswordValid) {
      return next(new InvalidCredentialsError());
    }

    const accessToken = generateToken(email);

    await models.User.update({ accessToken }, { where: { email } });

    res.status(200).json({
      accessToken,
      refreshToken: req.user.refreshToken,
      ExpireTime: JWT_EXPIRE_TIME,
    });

    next(null);
  } catch (e) {
    console.error(`[auth controller]: login error => ${e}`);
    next(e);
  }
};

const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.user.dataValues;

    const newAccessToken = generateToken(email);

    await models.User.update(
      { accessToken: newAccessToken },
      { where: { email } }
    );

    res.status(200).json({
      refreshToken: req.user.refreshToken,
      accessToken: newAccessToken,
      ExpireTime: JWT_EXPIRE_TIME,
    });

    next(null);
  } catch (e) {
    console.error(`[auth controller]: refreshToken error => ${e}`);
    next(e);
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) return next(new UnAuthorizedError());
    const accessToken = req.headers.authorization.replace("Bearer ", "");
    const email = verifyAuthToken(accessToken).data;

    await models.User.update({ accessToken: null }, { where: { email } });
    res.status(200).end();

    next(null);
  } catch (e) {
    console.error(`[auth controller]: logout error => ${e}`);
    next(e);
  }
};

const addRoleToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { role, email } = req.body;

    const roleId: number = ROLES[role as keyof typeof ROLES].id;

    const userRole = await models.Role.findOne({ where: { id: roleId } });

    if (!userRole) {
      return next(new NoSuchRole());
    }

    const user = await models.User.findOne({ where: { email } });

    if (!user) return next(new UnAuthorizedError());

    await models.UsersOnRoles.create({
      userId: user.dataValues.id,
      roleId: userRole.dataValues.id,
    });

    res
      .status(200)
      .send(`Role ${userRole.dataValues.name} is Added to user ${email}`);

    next(null);
  } catch (e) {
    console.error(`[auth controller]: addRoleToUser error => ${e}`);
    next(e);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;

    await models.User.destroy({
      where: {
        email,
      },
      force: true,
    });

    res.status(200).send(`User with email ${email} is deleted`);

    next(null);
  } catch (e) {
    console.error(`[auth controller]: deleteUser error => ${e}`);
    next(e);
  }
};

export default {
  getMe,
  register,
  login,
  refreshToken,
  logout,
  addRoleToUser,
  deleteUser,
};
