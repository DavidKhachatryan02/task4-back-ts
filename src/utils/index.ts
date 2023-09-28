import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY, JWT_EXPIRE_TIME } from "../constants/config";

export const generateToken = (data: number): string => {
  return jwt.sign({ data }, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRE_TIME,
  });
};

export const verifyAuthToken = (accessToken: string) => {
  return jwt.verify(accessToken, JWT_SECRET_KEY);
};

export const generateRefreshToken = (): string => {
  const characters: string =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result: string = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};
