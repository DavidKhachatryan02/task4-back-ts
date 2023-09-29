import { Request, Response, NextFunction } from "express";
import ROLES from "../../../constants/roles";
import { UserNotExists, IsNotCustomer } from "../../../errors/auth";
import { models } from "../../../services/sequelize";

export const isUserCustomer = async (
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

    if (!userRoles.includes(ROLES.CUSTOMER.id)) {
      return next(new IsNotCustomer());
    }

    next();
  } catch (e) {
    console.error(
      `[middleware]: Error on isUserCustomer middleware error => ${e}`
    );
    next(e);
  }
};
