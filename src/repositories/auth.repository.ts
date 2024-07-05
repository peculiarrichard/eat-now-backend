import UserModel from "../models/user.model";
import { User } from "../types/user.type";

export const findUserById = async (userId: string) => {
  try {
    const user = await UserModel.findById(userId);
    return user;
  } catch (error: any) {
    throw new Error(`Error retrieving user, ${error.message}`);
  }
};

export const findUserByEmail = async (email: string) => {
  try {
    const user = await UserModel.findOne({ email });
    return user;
  } catch (error: any) {
    throw new Error(`Error retrieving user, ${error.message}`);
  }
};

export const saveUser = async (user: User) => {
  try {
    const newUser = new UserModel(user);
    return newUser.save();
  } catch (error: any) {
    throw new Error(`Error saving user, ${error.message}`);
  }
};
