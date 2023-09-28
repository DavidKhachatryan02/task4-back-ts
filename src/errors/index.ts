import { NextFunction, Request, Response } from "express";

import {
  InvalidCredentialsError,
  UserNotExists,
  UnAuthorizedError,
  InvalidRefreshToken,
  UserExists,
  NoSuchRole,
  IsNotAdmin,
  UserHaveRole,
  IsNotCustomer,
  InvalidAccessToken,
} from "./auth";
import { ProductNotFound, ImgAlreadyAdded, ImgNotExists } from "./products";
import { InvalidBody } from "./validation";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error) {
    switch (error.constructor) {
      case ProductNotFound:
        res.status(404).json({ message: error.message });
        break;
      case InvalidAccessToken:
        res.status(400).json({ message: error.message });
        break;
      case ImgAlreadyAdded:
        res.status(400).json({ message: error.message });
        break;
      case ImgNotExists:
        res.status(404).json({ message: error.message });
        break;
      case IsNotCustomer:
        res.status(403).json({ message: error.message });
        break;
      case UserHaveRole:
        res.status(400).json({ message: error.message });
        break;
      case InvalidBody:
        res.status(400).json({ message: error.message });
        break;
      case NoSuchRole:
        res.status(400).json({ message: error.message });
        break;
      case UserNotExists:
        res.status(404).json({ message: error.message });
        break;
      case UserExists:
        res.status(400).json({ message: error.message });
        break;
      case UnAuthorizedError:
        res.status(401).json({ message: error.message });
        break;
      case IsNotAdmin:
        res.status(403).json({ message: error.message });
        break;
      case InvalidCredentialsError:
        res.status(403).json({ message: error.message });
        break;
      case InvalidRefreshToken:
        res.status(400).json({ message: error.message });
        break;
      default:
        res.status(500).json({ message: error.message });
    }

    return;
  }

  next(null);
};

module.exports = { errorHandler };
