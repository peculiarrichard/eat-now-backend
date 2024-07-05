import { agenda } from "../configs/agenda.config";
import { importJobs } from "./job-loader.helper";

let agendaInstance = agenda;
const jobTypes = ["email"];

(async () => {
  try {
    await importJobs(jobTypes, agendaInstance);

    if (jobTypes.length) {
      agendaInstance.on("ready", async () => {
        console.log("Agenda is ready");
        await agendaInstance.start();
      });

      agendaInstance.on("error", (err: any) => {
        console.error("Agenda error:", err);
      });
    }

    const gracefulShutdown = async () => {
      try {
        await agendaInstance.stop();
        console.log("Agenda stopped gracefully");
        process.exit(0);
      } catch (err) {
        console.error("Error during graceful shutdown:", err);
        process.exit(1);
      }
    };

    process.on("SIGTERM", gracefulShutdown);
    process.on("SIGINT", gracefulShutdown);
  } catch (err) {
    console.error("Error initializing agenda:", err);
  }
})();

export default agendaInstance;
