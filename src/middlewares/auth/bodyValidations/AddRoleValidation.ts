import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { InvalidBody } from "../../../errors/validation";

const addRoleSchema = Joi.object({
  email: Joi.string().required().email(),
  role: Joi.string().required(),
});

export const AddRoleValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = addRoleSchema.validate(req.body);

    if (error) {
      return next(new InvalidBody(error.message));
    }

    next();
  } catch (e) {
    console.error(
      `[middleware]: Error on addRoleValidation middleware error => ${e}`
    );
    next(e);
  }
};
