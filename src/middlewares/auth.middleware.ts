import jwt from "jsonwebtoken";
import UserModel from "../models/user.model";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Not authenticated: Authorization Header Missing" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Not authenticated: Invalid JWT" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    if (!decodedToken) {
      return res
        .status(401)
        .json({ message: "Not authenticated: Invalid JWT" });
    }

    const user = await UserModel.findById(decodedToken.userId);

    if (!user) {
      return res
        .status(401)
        .json({ message: "User does not exist. Kindly Sign Up" });
    }

    req.userId = decodedToken.userId;
    next();
  } catch (err: any) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(401).json({ message: "Not authenticated: Invalid JWT" });
  }
};

export default auth;
