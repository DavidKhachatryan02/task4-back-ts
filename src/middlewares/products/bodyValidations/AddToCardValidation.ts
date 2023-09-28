import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { InvalidBody } from "../../../errors/validation";

const addToCardSchema = Joi.object({
  productId: Joi.number().required(),
});

export const AddToCardValidation = (req: Request,
  res: Response,
  next: NextFunction) => {
  try {
    const { error } = addToCardSchema.validate(req.body);

    if (error) {
      return next(new InvalidBody(error.message));
    }

    next();
  } catch (e) {
    console.error(
      `[middleware]: Error on AddToCardValidation middleware error => ${e}`
    );
    next(e);
  }
};

