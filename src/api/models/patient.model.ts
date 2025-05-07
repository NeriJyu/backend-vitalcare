import mongoose, { Schema } from "mongoose";
import { I_Patient } from "../../interfaces/patient.interfaces";
import { PatientBloodTypeEnum } from "../enums/patient.enum";

const PatientSchema = new Schema<I_Patient>(
  {
    name: { type: String, required: true },
    birthDate: { type: Date, required: true },
    responsibleRg: { type: String, required: true },
    bloodType: {
      type: String,
      enum: Object.values(PatientBloodTypeEnum),
    },
    weight: { type: Number },
    height: { type: Number },
    room: { type: String },
    admittedAt: { type: Date },
    dischargedAt: { type: Date },
    allergies: { type: [String] },
    diagnosis: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
    },
    toObject: {
      versionKey: false,
    },
  }
);

export default mongoose.model<I_Patient>("Patient", PatientSchema);
