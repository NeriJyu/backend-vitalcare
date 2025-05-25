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
const startServer = async () => {
  await connectToDatabase();

  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
};

startServer();
