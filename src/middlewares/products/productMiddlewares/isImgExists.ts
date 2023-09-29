import { Request, Response, NextFunction } from "express";
import { ImgNotExists } from "../../../errors/products";
import { models } from "../../../services/sequelize";

export const isImgExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId, imgId } = req.body;

    const isImg = await models.ProductImg.findOne({
      where: { productId, id: imgId },
    });

    if (!isImg) {
      return next(new ImgNotExists());
    }
    next();
  } catch (e) {
    console.error(
      `[middleware]: Error on imImgExists middleware error => ${e}`
    );
    next(e);
  }
};
