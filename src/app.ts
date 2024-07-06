import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes/v1/index.router";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:5173",
      "https://eat-now-frontend.vercel.app"
    ],
    credentials: true,
  })
);

app.use("/api/v1", router);

export default app;
