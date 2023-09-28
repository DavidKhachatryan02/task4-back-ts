import { Request, Response, NextFunction } from "express";
import { models } from "../../../services/sequelize";
import { ROLES } from "../../../constants/roles";
import { UserHaveRole } from "../../../errors/auth";

export const isUserHaveRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, role } = req.body;
    const roleId = ROLES[await role.toUpperCase()].id;
    const user = await models.users.findOne({
      where: { email },
      include: {
        model: models.roles,
      },
    });

    const userRoles = user.roles.map((role) => role.id);

    if (userRoles.includes(roleId)) {
      return next(
        new UserHaveRole(email, ROLES[await role.toUpperCase()].name)
      );
    }

    req.user = user;
    req.roleId = roleId;

    next();
  } catch (e) {
    console.error(
      `[middleware]: Error on isUserHaveRole middleware error => ${e}`
    );
    next(e);
  }
};
