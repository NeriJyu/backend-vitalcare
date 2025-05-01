import mongoose, { Schema } from "mongoose";
import { I_Patient } from "../../interfaces/patient.interfaces";

const PatientSchema = new Schema<I_Patient>(
  {
    name: { type: String, required: true },
    birthDate: { type: Date, required: true },
    responsibleRg: { type: String, required: true },
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
