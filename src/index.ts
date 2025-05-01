import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { connectToDatabase } from './config/database';
import router from './api/routes/index.route';
import "./api/services/mqtt.service";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", router);

app.get('/', (req, res) => {
  res.send('Hello, VitalCare!');
});

const startServer = async () => {
  await connectToDatabase();

  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
};

startServer();
