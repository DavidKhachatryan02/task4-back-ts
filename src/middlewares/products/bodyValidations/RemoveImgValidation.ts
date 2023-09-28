import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { InvalidBody } from "../../../errors/validation";

const removeImgSchema = Joi.object({
  productId: Joi.number().required(),
  imgId: Joi.number().required(),
});

export const RemoveImgValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { error } = removeImgSchema.validate(req.body);

    if (error) {
      return next(new InvalidBody(error.message));
    }

    next();
  } catch (e) {
    console.error(
      `[middleware]: Error on RemoveImgValidation middleware error => ${e}`
    );
    next(e);
  }
};
