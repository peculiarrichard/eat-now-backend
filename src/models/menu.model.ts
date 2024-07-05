import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
});

const MenuModel = mongoose.model("Menu", menuSchema, "menu");

export default MenuModel;
