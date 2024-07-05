import { sendEmail } from "../helpers/sendemail.helper";

export default async (agenda: any) => {
  agenda.define("scheduleEmail", async (job: any, done: any) => {
    const { email, subject, userName, menu } = job.attrs.data;
    await sendEmail(email, subject, menu, userName);
    done();
  });
};
