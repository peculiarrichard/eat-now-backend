import { Agenda } from "@hokify/agenda";
import dotenv from "dotenv";

dotenv.config();

const agendaConfig = {
  db: {
    address: process.env.MONGODB_URI,
    collection: "jobs",
  },
  name: "agenda-instance",
  maxConcurrency: 100,
  defaultConcurrency: 50,
};

export const agenda = new Agenda(agendaConfig);
