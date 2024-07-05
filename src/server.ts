import http from "http";
import app from "./app";
import dotenv from "dotenv";
import connectToDB from "./configs/db.config";

dotenv.config();

const port = normalizePort(process.env.PORT || "8000");
app.set("port", port);

function normalizePort(val: string): number | string | false {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

const server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(): void {
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr?.port}`;
  console.log(`Listening on ${bind}`);

  connectToDB()
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error: any) => {
      console.error("Failed to connect to the database:", error.message);
    });
}

// Node Error Handling
process.on("unhandledRejection", (err: any) => {
  console.error(`Uncaught Rejection: ${err.name}, ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
