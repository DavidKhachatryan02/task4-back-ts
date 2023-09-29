import { Request, Response, NextFunction } from "express";
import ROLES from "../../../constants/roles";
import { IsNotAdmin, UserNotExists } from "../../../errors/auth";
import { models } from "../../../services/sequelize";

export const isUserAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.user.data;
    const user = await models.User.findOne({
      where: { email },
      include: {
        model: models.Role,
      },
    });

    if (!user) {
      return next(new UserNotExists(email));
    }

    const userRoles = user.Roles.map((role: { id: number }) => role.id);

    if (!userRoles.includes(ROLES.ADMIN.id)) {
      return next(new IsNotAdmin());
    }

    next();
  } catch (e) {
    console.error(
      `[middleware]: Error on isUserAdmin middleware error => ${e}`
    );
    next(e);
  }
};
