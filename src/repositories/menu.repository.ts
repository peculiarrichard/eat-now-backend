import MenuModel from "../models/menu.model";

export const addNewMenu = async (
  name: string,
  category: string,
  options: string[]
) => {
  try {
    const newMenu = new MenuModel({
      name,
      category,
      options,
    });
    return newMenu.save();
  } catch (error: any) {
    throw new Error(`Error adding menu, ${error.message}`);
  }
};

export const getMenuByCategory = async (category: string) => {
  try {
    const menu = await MenuModel.find({ category });
    return menu;
  } catch (error: any) {
    throw new Error(`Error retrieving menu, ${error.message}`);
  }
};
