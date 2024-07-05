import { registerAndLoginUser } from "../../controllers/auth.controller";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/register-and-login", registerAndLoginUser);

export default authRouter;
