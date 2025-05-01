import mqtt from "mqtt";
import { I_VitalData } from "../../interfaces/vitalData.interfaces";
import VitalDataController from "../controllers/vitalData.controller";

const client = mqtt.connect("mqtt://test.mosquitto.org");
const vitalDataController = new VitalDataController();

let buffer: I_VitalData[] = [];
const INTERVAL_MS = 30000;

client.on("connect", () => {
  console.log("Connected to MQTT broker");
  client.subscribe("vitalcare/#");
});

client.on("message", async (topic, message) => {
  try {
    const data: I_VitalData = JSON.parse(message.toString());
    buffer.push(data);

  } catch (err) {
    console.error("Error processing MQTT message", err);
  }
});

const saveBatch = async () => {
  if (buffer.length === 0) return;

  try {
    await Promise.all(buffer.map((data) => vitalDataController.create(data)));
    console.log(`✅ Batch saved with ${buffer.length} records`);
    buffer = [];
  } catch (err) {
    console.error("Error saving batch:", err);
  }
};

setInterval(saveBatch, INTERVAL_MS);
