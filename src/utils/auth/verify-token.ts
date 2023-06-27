import jwt from "jsonwebtoken";
import { config } from "../../config";

const JWT_SECRET: any = process.env.JWT_SECRET;

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.jwtSecret);
};
