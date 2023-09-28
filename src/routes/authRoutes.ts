import express from "express";
import authController from "../controllers/auth.controller";

import {
  AddRoleValidation,
  LoginValidation,
  RefreshValidation,
  RegisterValidation,
  isUserAuthorized,
  isUserExists,
  isUserHaveRole,
  isUserRegistered,
  isValidToken,
} from "../middlewares/auth";

const authRouter = express.Router();

authRouter.get("/getMe", isUserAuthorized, authController.getMe);

authRouter.post("/login", LoginValidation, isUserExists, authController.login);

authRouter.post("/deleteUser", authController.deleteUser);

authRouter.post(
  "/register",
  RegisterValidation,
  isUserRegistered,
  authController.register
);

authRouter.post(
  "/refreshToken",
  RefreshValidation,
  isValidToken,
  authController.refreshToken
);

authRouter.post("/logout", authController.logout);

authRouter.post(
  "/addRoleToUser",
  AddRoleValidation,
  isUserHaveRole,
  authController.addRoleToUser
);

export default authRouter;
