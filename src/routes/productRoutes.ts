// import express from "express";
// import productsController from "../controllers/products.controller";

// import { isUserAuthorized } from "../middlewares/auth";
// import {
//   AddImgValidation,
//   AddToCardValidation,
//   DeleteItemValidation,
//   EditProductValidation,
//   ProductValidation,
//   RemoveImgValidation,
//   isImgAdded,
//   isImgExists,
//   isUserAdmin,
//   isUserCustomer,
// } from "../middlewares/products";

// const productsRouter = express.Router();

// productsRouter.post(
//   "/addProduct",
//   ProductValidation,
//   isUserAuthorized,
//   isUserAdmin,
//   productsController.addProduct
// );

// productsRouter.post(
//   "/editProduct",
//   EditProductValidation,
//   isUserAuthorized,
//   isUserAdmin,
//   productsController.editProduct
// );

// productsRouter.post(
//   "/deleteProduct",
//   DeleteItemValidation,
//   isUserAuthorized,
//   isUserAdmin,
//   productsController.deleteProduct
// );

// productsRouter.post(
//   "/addImg",
//   AddImgValidation,
//   isImgAdded,
//   isUserAuthorized,
//   isUserAdmin,
//   productsController.addImg
// );

// productsRouter.post(
//   "/removeImg",
//   RemoveImgValidation,
//   isImgExists,
//   isUserAuthorized,
//   isUserAdmin,
//   productsController.removeImg
// );

// productsRouter.get(
//   "/getAllProducts",
//   isUserAuthorized,
//   productsController.getAllProducts
// );

// productsRouter.get(
//   "/getProductInfo",
//   isUserAuthorized,
//   productsController.getProductInfo
// );

// productsRouter.post(
//   "/addToCard",
//   AddToCardValidation,
//   isUserAuthorized,
//   isUserCustomer,
//   productsController.addToCard
// );

// productsRouter.post(
//   "/removeProductFromCard",
//   AddToCardValidation,
//   isUserAuthorized,
//   isUserCustomer,
//   productsController.removeProductFromCard
// );

// productsRouter.get(
//   "/getUserCard",
//   isUserAuthorized,
//   isUserCustomer,
//   productsController.getUserCard
// );

// export default productsRouter;
