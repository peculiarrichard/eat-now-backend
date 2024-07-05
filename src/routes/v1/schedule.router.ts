import { Router } from "express";
import {
  createJob,
  getUserJobs,
  deleteJob,
  updateJob,
} from "../../controllers/schedule.controller";
import auth from "../../middlewares/auth.middleware";

const scheduleRouter = Router();

scheduleRouter.post("/create-job", auth, createJob);
scheduleRouter.get("/get-user-jobs", auth, getUserJobs);
scheduleRouter.delete("/delete-job/:id", auth, deleteJob);
scheduleRouter.put("/update-job/:id", auth, updateJob);

export default scheduleRouter;
