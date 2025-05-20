import mqtt from "mqtt";
import { I_VitalData } from "../../interfaces/vitalData.interfaces";
import VitalDataController from "../controllers/vitalData.controller";
import PatientRepository from "../repositories/patient.repository";

const INTERVAL_MS = 30000;

class MqttService {
  private client;
  private vitalDataController = new VitalDataController();
  //private patientRepository = new PatientRepository();
  private buffer: I_VitalData[] = [];

  constructor(brokerUrl: string) {
    this.client = mqtt.connect(brokerUrl);

    this.client.on("connect", this.onConnect.bind(this));
    this.client.on("message", this.onMessage.bind(this));

    setInterval(this.saveBatch.bind(this), INTERVAL_MS);
  }

  private onConnect() {
    console.log("Connected to MQTT broker");
    this.client.subscribe("vitalcare/#");
  }

  private async onMessage(topic: string, message: Buffer) {
    try {
      let data: I_VitalData = JSON.parse(message.toString());
      data.createdAt = new Date();

     // const patient = await this.patientRepository.findById(data.patientId);

      //console.log(data.createdAt);
      //console.log(patient._id);
      
      this.buffer.push(data);
    } catch (err) {
      console.error("Error processing MQTT message", err);
    }
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
export default new MqttService("mqtt://test.mosquitto.org");
