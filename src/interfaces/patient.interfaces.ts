import { Types } from "mongoose";
import { PatientBloodTypeEnum } from "../api/enums/patient.enum";

export interface I_Patient {
  _id?: Types.ObjectId;
  name: string;
  birthDate: Date;
  responsibleRg: string;
  bloodType?: PatientBloodTypeEnum;
  weight?: number;
  height?: number;
  room?: string;
  admittedAt?: Date;
  dischargedAt?: Date;
  allergies?: string[];
  diagnosis?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
