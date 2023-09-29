import { Request, Response, NextFunction } from "express";
import { ProductNotFound } from "../errors/products";
import { models } from "../services/sequelize";
import { UserNotExists } from "../errors/auth";

const addProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description, price } = req.body;
    const newProduct = await models.Products.create({
      name,
      description,
      price,
    });
    res.status(201).json(newProduct);
    next(null);
  } catch (e) {
    console.error(`[products controller]: addProduct error => ${e}`);
    next(e);
  }
};

const editProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId, name, description, price } = req.body;
    const product = await models.Products.findOne({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return next(new ProductNotFound());
    }

    product.set({
      name: name ?? product.dataValues.name,
      description: description ?? product.dataValues.description,
      price: price ?? product.dataValues.price,
    });

    await product.save();

    res.status(200).json(product);
    next(null);
  } catch (e) {
    console.error(`[products controller]: editProduct error => ${e}`);

    next(e);
  }
};

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.body.productId;
    await models.Products.destroy({
      where: {
        id,
      },
    });
    res.status(200).send(`product with ID-${id} is deleted`);
    next(null);
  } catch (e) {
    console.error(`[products controller]: deleteProduct error => ${e}`);
    next(e);
  }
};

const addImg = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId, imgUrl } = req.body;
    await models.ProductImg.create({
      productId,
      imgUrl,
    });
    res.status(200).send(`img ${imgUrl} added to product ${productId}`);
    next(null);
  } catch (e) {
    console.error(`[products controller]: addImg error => ${e}`);
    next(e);
  }
};

const removeImg = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.body.imgId;
    const { productId } = req.body;

    await models.ProductImg.destroy({
      where: {
        id,
        productId,
      },
    });
    res
      .status(200)
      .send(`img ${id} is deleted from product with ID-${productId} `);
    next(null);
  } catch (e) {
    console.error(`[products controller]: removeImg error => ${e}`);
    next(e);
  }
};

const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await models.Products.findAll({
      attributes: ["id", "name", "price", "description"],
      include: [
        {
          model: models.ProductImg,
          as: "imgUrl",
          attributes: ["imgUrl", "id"],
        },
      ],
    });

    res.status(200).json(products);
    next(null);
  } catch (e) {
    console.error(`[products controller]: getAllProducts error => ${e}`);
    next(e);
  }
};

const getProductInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let id;
    const idParam = req.query.id;

    if (typeof idParam === "string") {
      id = parseInt(idParam);

      if (!isNaN(id)) {
        res.status(404).send("not found").end();
      }
    }

    const product = await models.Products.findOne({
      where: { id },
      include: [
        {
          model: models.ProductImg,
          as: "imgUrl",
          attributes: ["id", "imgUrl"],
        },
      ],
    });

    if (!product) {
      return next(new ProductNotFound());
    }

    res.status(200).json(product);
    next(null);
  } catch (e) {
    console.error(`[products controller]: getProductInfo error => ${e}`);
    next(e);
  }
};

const addToCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId } = req.body;

    const email = req.user.data;

    const user = await models.User.findOne({ where: { email } });

    if (!user) return next(new UserNotExists(email));

    const [addedProduct, created] = await models.Card.findOrCreate({
      where: { userId: user.id, productId },
    });

    if (!created) {
      await addedProduct.increment("quantity");
    }

    res.status(200).json(addedProduct);

    next(null);
  } catch (e) {
    console.error(`[products controller]: addToCard error => ${e}`);
    next(e);
  }
};

const getUserCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.user.data;

    const user = await models.User.findOne({ where: { email } });

    if (!user) return next(new UserNotExists(email));

    const userCard = await models.Card.findAll({
      where: { userId: user.id },
      attributes: ["quantity", "productId"],
      include: [
        {
          model: models.Products,
          attributes: ["name", "price", "description"],
          include: [
            {
              model: models.ProductImg,
              as: "imgUrl",
              attributes: ["imgUrl", "id"],
            },
          ],
        },
      ],
    });

    res.status(200).json(userCard);
    next(null);
  } catch (e) {
    console.error(`[products controller]: getUserCard error => ${e}`);
    next(e);
  }
};

const removeProductFromCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.user.data;
    const { productId } = req.body;

    const user = await models.User.findOne({ where: { email } });

    if (!user) return next(new UserNotExists(email));

    const productToDelete = await models.Card.findOne({
      where: { userId: user.id, productId },
    });

    if (!productToDelete) return next(new ProductNotFound());

    if (productToDelete.quantity != 1) {
      await productToDelete.decrement("quantity");
      res.status(200).send("quantity decremented");
    } else {
      await productToDelete.destroy({ force: true });
      res.status(200).send("Product deleted from card");
    }
    next(null);
  } catch (e) {
    console.error(`[products controller]: removeProductFromCard error => ${e}`);
    next(e);
  }
};

export default {
  addProduct,
  removeImg,
  editProduct,
  deleteProduct,
  addToCard,
  removeProductFromCard,
  addImg,
  getAllProducts,
  getProductInfo,
  getUserCard,
};
