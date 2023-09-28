import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { InvalidBody } from "../../../errors/validation";

const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
});

export const ProductValidation = (req: Request,
  res: Response,
  next: NextFunction) => {
  try {
    const { error } = productSchema.validate(req.body);

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

