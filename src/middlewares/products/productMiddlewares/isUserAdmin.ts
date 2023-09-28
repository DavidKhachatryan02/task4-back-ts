import { Request, Response, NextFunction } from "express";
import ADMIN from "../../../constants/roles";
import { IsNotAdmin, UserNotExists } from "../../../errors/auth";
import { models } from "../../../services/sequelize";

export const isUserAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.user.data;
    const user = await models.users.findOne({
      where: { email },
      include: {
        model: models.roles,
      },
    });

    if (!user) {
      return next(new UserNotExists(email));
    }

    const userRoles = user.roles.map((role) => role.id);

    if (!userRoles.includes(ADMIN.id)) {
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
