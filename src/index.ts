import dotenv from "dotenv";
dotenv.config();

import express from "express";
import helmet from "helmet";
import cors from "cors";
import { connectToDatabase } from "./config/database";
import router from "./api/routes/index.route";
import "./api/services/mqtt.service";
import { sanitizeInputs } from "./api/middlewares/sanitize.middleware";
import { globalRateLimiter } from "./api/middlewares/rateLimit.middleware";
import { errorHandler } from "./api/middlewares/error.middleware";
import http from "http";
import { WebSocketServer } from "ws";
import MqttService from "./api/services/mqtt.service";

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(sanitizeInputs);
app.use(globalRateLimiter);

app.use("/api", router);
app.get("/", (req, res) => {
  res.send("Hello, VitalCare!");
});
app.use(errorHandler);

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const startServer = async () => {
  await connectToDatabase();

  server.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
    console.log(`✅ WebSocket server running on ${process.env.PORT}`);
  });
  new MqttService("mqtt://test.mosquitto.org");
};

startServer();
export { server, wss };
