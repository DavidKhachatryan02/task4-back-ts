import { Request, Response, NextFunction } from "express";
import { ImgAlreadyAdded } from "../../../errors/products";
import { models } from "../../../services/sequelize";

export const isImgAdded = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId, imgUrl } = req.body;

    const imgAdded = await models.product_Images.findOne({
      where: { productId, imgUrl },
    });

    if (imgAdded) {
      return next(new ImgAlreadyAdded());
    }
    next();
  } catch (e) {
    console.error(`[middleware]: Error on isImgAdded middleware error => ${e}`);
    next(e);
  }
};
