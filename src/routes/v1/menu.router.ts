import { Router } from "express";
import { addMenu } from "../../controllers/menu.controller";
const menuRouter = Router();

menuRouter.post("/add-menu", addMenu);

export default menuRouter;
