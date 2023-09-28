import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { InvalidBody } from "../../../errors/validation";

const deleteSchema = Joi.object({
  productId: Joi.number().required(),
});

export const DeleteItemValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = deleteSchema.validate(req.body);

    if (error) {
      return next(new InvalidBody(error.message));
    }

    next();
  } catch (e) {
    console.error(
      `[middleware]: Error on productValidation middleware error => ${e}`
    );
    next(e);
  }
};

