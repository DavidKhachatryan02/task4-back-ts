import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { InvalidBody } from "../../../errors/validation";

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const LoginValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = loginSchema.validate(req.body);

    if (error) {
      return next(new InvalidBody(error.message));
    }

    next();
  } catch (e) {
    console.error(
      `[middleware]: Error on LoginValidation middleware error => ${e}`
    );
    next(e);
  }
};
