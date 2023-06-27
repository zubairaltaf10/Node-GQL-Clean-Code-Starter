import jwt from "jsonwebtoken";
import { config } from "../../config";


export const signToken = (data: any) => {
  try {
    return jwt.sign(data, config.jwtSecret);
  } catch (error: any) {
    throw Error(error.message);
  }
};
