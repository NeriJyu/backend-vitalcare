import mqtt from "mqtt";
import { I_VitalData } from "../../interfaces/vitalData.interfaces";
import VitalDataController from "../controllers/vitalData.controller";
import {
  AdolescentEnum,
  AdultEnum,
  InfantEnum,
  NeonateEnum,
  PreschoolEnum,
  SchoolAgeEnum,
  ToddlerEnum,
} from "../enums/vitalData.enum";
import { logger } from "../../utils/logger.util";
import { wss } from "../..";

const PORT = process.env.PORT || 3000;
const INTERVAL_MS = 30000;

class MqttService {
  private client: mqtt.MqttClient;
  private vitalDataController = new VitalDataController();
  private buffer: I_VitalData[] = [];

  constructor(brokerUrl: string) {
    this.client = mqtt.connect(brokerUrl);

    this.client.on("connect", this.onConnect.bind(this));
    this.client.on("message", this.onMessage.bind(this));

    setInterval(this.saveBatch.bind(this), INTERVAL_MS);
    wss.on("connection", (ws) => {
      console.log("WebSocket connection established");
    });
  }

  private onConnect() {
    console.log("Connected to MQTT broker");
    this.client.subscribe("vitalcare/#");
  }

  private async onMessage(topic: string, message: Buffer) {
    try {
      let data: I_VitalData = JSON.parse(message.toString());
      data.createdAt = new Date();
      data.isCritical = this.isVitalCritical(data);

      this.buffer.push(data);

      const payload = JSON.stringify(data);
      wss.clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
          client.send(payload);
        }
      });
    } catch (err) {
      console.error("Error processing MQTT message", err);
    }
  }

  private isVitalCritical(data: I_VitalData): boolean {
    let isCritical = false;
    const range = this.selectRange(data.patientId, data.age);

    if (
      data.heartRate < range.MIN_HEART_RATE ||
      data.heartRate > range.MAX_HEART_RATE ||
      data.oxygenLevel < range.MIN_SPO2 ||
      data.temperature < range.MIN_TEMP ||
      data.temperature > range.MAX_TEMP ||
      data.hydration < range.MIN_HYDRATION ||
      data.respiration < range.MIN_RESPIRATION ||
      data.respiration > range.MAX_RESPIRATION
    ) {
      isCritical = true;
    }

    return isCritical;
  }

  private selectRange(patientId, ageInDays: number) {
    if (ageInDays <= 28) return NeonateEnum;
    if (ageInDays <= 365) return InfantEnum;
    if (ageInDays <= 730) return ToddlerEnum;
    if (ageInDays <= 1825) return PreschoolEnum;
    if (ageInDays <= 4380) return SchoolAgeEnum;
    if (ageInDays <= 5475) return AdolescentEnum;
    if (ageInDays > 5475 && ageInDays < 21900) return AdultEnum;

    logger.error("Age out of range: patientId: " + patientId);
  }

  private async saveBatch() {
    if (this.buffer.length === 0) return;

    try {
      await Promise.all(
        this.buffer.map((data) => this.vitalDataController.create(data))
      );
      console.log(`✅ Batch saved with ${this.buffer.length} records`);
      this.buffer = [];
    } catch (err) {
      console.error("Error saving batch:", err);
    }
  }
}
export default MqttService;
