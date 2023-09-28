import { Request, Response, NextFunction } from "express";
import { InvalidRefreshToken, InvalidAccessToken } from "../../../errors/auth";
import { models } from "../../../services/sequelize";

export const isValidToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken, accessToken } = req.body;

    const user = await models.users.findOne({ where: { refreshToken } });

    if (accessToken !== user.accessToken) {
      return next(new InvalidAccessToken());
    }

    if (refreshToken !== user.refreshToken) {
      return next(new InvalidRefreshToken());
    }

    req.user = user;

    next();
  } catch (e) {
    console.error(
      `[middleware]: Error on isValidToken middleware error => ${e}`
    );
    next(e);
  }
};
