import { Router } from "express";
import menuRouter from "./menu.router";
import scheduleRouter from "./schedule.router";
import authRouter from "./auth.router";

const router = Router();

router.use("/auth", authRouter);
router.use("/menu", menuRouter);
router.use("/schedule", scheduleRouter);

router.use("/", (req, res) => {
  res.send("Welcome to Eat Now API V1");
});

export default router;
