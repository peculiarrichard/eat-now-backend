import { Agenda } from "@hokify/agenda";

export const importJobs = async (
  jobTypes: string[],
  agendaInstance: Agenda
) => {
  for (const jobType of jobTypes) {
    try {
      const job = await import(`../jobs/${jobType}.job`);
      job.default(agendaInstance);
    } catch (err) {
      console.error(`Error loading job type ${jobType}:`, err);
    }
  }
};
