import { AddImgValidation } from "./bodyValidations/AddImgValidation";
import { DeleteItemValidation } from "./bodyValidations/DeleteItemValidation";
import { EditProductValidation } from "./bodyValidations/EditProductValidation";
import { ProductValidation } from "./bodyValidations/ProductValidation";
import { AddToCardValidation } from "./bodyValidations/AddToCardValidation";
import { RemoveImgValidation } from "./bodyValidations/RemoveImgValidation";
import { isImgAdded } from "./productMiddlewares/isImgAdded";
// import { isImgExists } from "./productMiddlewares/isImgExists";
// import { isUserAdmin } from "./productMiddlewares/isUserAdmin";
// import { isUserCustomer } from "./productMiddlewares/isUserCustomer";

export {
  AddToCardValidation,
  AddImgValidation,
  DeleteItemValidation,
  EditProductValidation,
  ProductValidation,
  RemoveImgValidation,
  isImgAdded,
  // isImgExists,
  // isUserAdmin,
  // isUserCustomer,
};
