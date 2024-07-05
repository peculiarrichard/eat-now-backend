import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transport = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

export default transport;
