import JobsModel from "../models/jobs.model";
import { findUserById } from "../repositories/auth.repository";
import { Request, Response } from "express";
import agendaInstance from "../helpers/agenda.instance.helper";
import { getMenuByCategory } from "../repositories/menu.repository";
import { getFiveRandomFoodMenus } from "../helpers/get-random-food-menu";
import { ObjectId } from "mongodb";

export const createJob = async (req: Request, res: Response) => {
  try {
    const { userId } = req;
    const { scheduleFrequency, category, title, type } = req.body;
    const user = await findUserById(userId!);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const { userName, email } = user;
    const foodMenu = await getMenuByCategory(category);
    const menu = getFiveRandomFoodMenus(foodMenu[0].options);
    const options = {
      email: email,
      subject: "It's time to eat!",
      userName: userName,
      menu: menu,
      userId: userId,
      title: title,
      type: type,
      category: category,
    };

    const emailAgenda = agendaInstance.create("scheduleEmail", options);
    if (type === "reoccuring") {
      emailAgenda.repeatEvery(scheduleFrequency, { skipImmediate: true });
      // agendaInstance.every(scheduleFrequency, "scheduleEmail", options);
    } else {
      emailAgenda.schedule(scheduleFrequency);
    }
    emailAgenda.save();

    return res.status(200).json({
      success: true,
      message: "Job created successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "There was an error in scheduling this job",
    });
  }
};

export const updateJob = async (req: Request, res: Response) => {
  try {
    const { userId } = req;
    const { id } = req.params as unknown as ObjectId;
    const { scheduleFrequency } = req.body;

    const updateJob = await JobsModel.findOneAndUpdate(
      { _id: id },
      {
        nextRunAt: scheduleFrequency,
      },
      { new: true }
    );
    if (!updateJob) {
      return res.status(400).json({
        success: false,
        message: "Job not found",
        data: updateJob,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: updateJob,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "There was an error in updating this job",
    });
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  try {
    const { userId } = req;
    const { id } = req.params as unknown as ObjectId;

    const deletedJob = await agendaInstance.cancel({ _id: id });

    if (!deletedJob) {
      return res.status(400).json({ success: false, message: "Job not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "There was an error in deleting this job",
    });
  }
};

export const getUserJobs = async (req: Request, res: Response) => {
  try {
    const { userId } = req;

    const user = await findUserById(userId!);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const userJobs = await JobsModel.find({ "data.userId": userId });
    return res.status(200).json({
      success: true,
      message: "Collected user jobs successfully",
      data: userJobs,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "There was an error with collecting user jobs",
    });
  }
};
