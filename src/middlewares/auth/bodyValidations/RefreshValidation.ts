import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { InvalidBody } from "../../../errors/validation";

const refreshSchema = Joi.object({
  refreshToken: Joi.string().required(),
  accessToken: Joi.string().required(),
});

export const RefreshValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = refreshSchema.validate(req.body);

    if (error) {
      return next(new InvalidBody(error.message));
    }

    next();
  } catch (e) {
    console.error(
      `[middleware]: Error on RefreshValidation middleware error => ${e}`
    );
    next(e);
  }
};

