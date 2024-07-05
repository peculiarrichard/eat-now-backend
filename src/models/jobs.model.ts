import mongoose from "mongoose";

const jobsSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  data: {
    type: Object,
  },
});

const JobsModel = mongoose.model("Jobs", jobsSchema, "jobs");

export default JobsModel;
