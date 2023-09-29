import { Request, Response, NextFunction } from "express";
import { models } from "../../../services/sequelize";
import ROLES from "../../../constants/roles";
import { UserHaveRole, UserNotExists } from "../../../errors/auth";

export const isUserHaveRole = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, role } = req.body;
    const roleId = ROLES[(await role.toUpperCase()) as keyof typeof ROLES].id;
    const user = await models.User.findOne({
      where: { email },
      include: {
        model: models.Role,
      },
    });

    if (!user) return next(new UserNotExists(email));

    console.log(user);

    const roleIds = user.Roles.map((role: { id: number }) => role.id);

    if (roleIds.includes(roleId)) {
      return next(
        new UserHaveRole(
          email,
          ROLES[(await role.toUpperCase()) as keyof typeof ROLES].RoleName
        )
      );
    }

    req.user = user;

    next();
  } catch (e) {
    console.error(
      `[middleware]: Error on isUserHaveRole middleware error => ${e}`
    );
    next(e);
  }
};
