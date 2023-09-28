import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { InvalidBody } from "../../../errors/validation";

const editProduct = Joi.object({
  productId: Joi.number().required(),
  name: Joi.string(),
  description: Joi.string(),
  price: Joi.number(),
});

export const EditProductValidation = (req: Request,
  res: Response,
  next: NextFunction) => {
  try {
    const { error } = editProduct.validate(req.body);

    if (error) {
      return next(new InvalidBody(error.message));
    }

    next();
  } catch (e) {
    console.error(
      `[middleware]: Error on EditProductValidation middleware error => ${e}`
    );
    next(e);
  }
};

