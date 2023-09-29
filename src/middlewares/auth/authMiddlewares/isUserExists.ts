import { Request, Response, NextFunction } from "express";
import { UserNotExists } from "../../../errors/auth";
import { models } from "../../../services/sequelize";

export const isUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const user = await models.User.findOne({ where: { email } });

    if (!user) {
      return next(new UserNotExists(email));
    }

    req.user = user;

    next();
  } catch (e) {
    console.error(
      `[middleware]: Error on isUserExists middleware error => ${e}`
    );
    next(e);
  }
};
