import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { InvalidBody } from "../../../errors/validation";

const addImgSchema = Joi.object({
  productId: Joi.number().required(),
  imgUrl: Joi.string().required(),
});

export const AddImgValidation = (req: Request,
  res: Response,
  next: NextFunction) => {
  try {
    const { error } = addImgSchema.validate(req.body);

    if (error) {
      return next(new InvalidBody(error.message));
    }

    next();
  } catch (e) {
    console.error(
      `[middleware]: Error on AddImgValidation middleware error => ${e}`
    );
    next(e);
  }
};

