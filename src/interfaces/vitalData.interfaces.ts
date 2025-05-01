import { Types } from "mongoose";

export interface I_VitalData {
  _id?: Types.ObjectId;
  temperature: number;
  heartRate: number;
  oxygenLevel: number;
  hydration: number;
  respiration: number;
  patientId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
