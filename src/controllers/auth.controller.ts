import { findUserByEmail, saveUser } from "../repositories/auth.repository";
import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

const generateToken = (userId: ObjectId, userName: string, email: string) => {
  const tokenData = {
    userId: userId,
    userName: userName,
    email: email,
  };

  return jwt.sign(tokenData, process.env.JWT_SECRET!, {
    expiresIn: "3d",
  });
};

export const registerAndLoginUser = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body;
    const sanitizedEmail = email.toLowerCase().trim();
    const user = await findUserByEmail(sanitizedEmail);
    if (user) {
      const validPassword = await bcryptjs.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({
          success: false,
          message: "Invalid credentials",
        });
      }
      const id = user?._id;
      const token = generateToken(user._id, user.userName, user.email);
      return res.status(200).json({
        success: true,
        message: "You have logged in successfully",
        user: {
          token,
          userName,
          email,
          id,
        },
      });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await saveUser({
      userName,
      email: sanitizedEmail,
      password: hashedPassword,
    });

    const token = generateToken(newUser._id, newUser.userName, newUser.email);
    const id = newUser._id;

    return res.status(201).json({
      success: true,
      message: "You have successfully registered and logged in",
      user: {
        token,
        userName,
        email,
        id,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
