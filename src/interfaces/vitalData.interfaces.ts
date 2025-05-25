import { Types } from "mongoose";

export interface I_VitalData {
  _id?: Types.ObjectId;
  temperature: number;
  heartRate: number;
  oxygenLevel: number;
  hydration: number;
  respiration: number;
  isCritical?: boolean;
  patientId: Types.ObjectId;
  age: number;
  createdAt?: Date;
  updatedAt?: Date;
}
