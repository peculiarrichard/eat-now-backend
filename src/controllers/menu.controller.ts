import { addNewMenu } from "../repositories/menu.repository";
import { Request, Response, NextFunction } from "express";

export const addMenu = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, category, options } = req.body;

  try {
    const newMenu = await addNewMenu(name, category, options);
    return res.status(200).json({
      success: true,
      data: newMenu,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
