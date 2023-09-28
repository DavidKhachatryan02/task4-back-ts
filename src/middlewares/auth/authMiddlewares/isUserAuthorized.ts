import { Request, Response, NextFunction } from "express";
import { UnAuthorizedError } from "../../../errors/auth";
import { verifyAuthToken } from "../../../utils";

export const isUserAuthorized = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const headersAuth = req.headers.authorization;

    if (!headersAuth) {
      return next(new UnAuthorizedError());
    }

    const accessToken = headersAuth.replace("Bearer ", "");
    const payload = verifyAuthToken(accessToken);

    if (!payload) {
      return next(new UnAuthorizedError());
    }

    req.user = payload;
    next();
  } catch (e) {
    console.error(
      `[middleware]: Error on isUserAuthorized middleware error => ${e}`
    );

    next(new UnAuthorizedError());
  }
};
