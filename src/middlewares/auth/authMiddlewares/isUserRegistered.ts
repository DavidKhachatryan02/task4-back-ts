import { Request, Response, NextFunction } from "express";
import { UserExists } from "../../../errors/auth";
import { models } from "../../../services/sequelize";

export const isUserRegistered = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const user = await models.User.findOne({ where: { email } });
    if (user) {
      return next(new UserExists(email));
    }

    next();
  } catch (e) {
    console.error(
      `[middleware]: Error on isUserRegistered middleware error => ${e}`
    );
    next(e);
  }
};
