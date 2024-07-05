import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import path from "path";
import transport from "../configs/email.config";

// Define __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getEmailTemplate = (
  templateName: string,
  variables: { [key: string]: string }
): string => {
  const templatePath = path.join(__dirname, "../assets/emails", templateName);
  let template = fs.readFileSync(templatePath, "utf-8");

  return Object.entries(variables).reduce(
    (acc: string, [key, value]: [string, string]) => {
      const placeholder = new RegExp(`{{${key}}}`, "g");
      return acc.replace(placeholder, value);
    },
    template
  );
};

export const sendEmail = async (
  to: string,
  subject: string,
  menu: string,
  userName: string
) => {
  const variables = {
    menu,
    userName,
  };

  const emailTemplate = getEmailTemplate("reminder-email.html", variables);
  const mailOptions = {
    from: process.env.SMTP_USERNAME,
    to,
    subject,
    html: emailTemplate,
  };

  return new Promise((resolve, reject) => {
    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reject(error);
      }
      resolve(info);
    });
  });
};
