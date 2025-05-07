import mongoose, { Schema, model } from "mongoose";
import { I_VitalData } from "../../interfaces/vitalData.interfaces";

const vitalDataSchema = new Schema<I_VitalData>(
  {
    temperature: { type: Number, required: true },
    heartRate: { type: Number, required: true },
    oxygenLevel: { type: Number, required: true },
    hydration: { type: Number, required: true },
    respiration: { type: Number, required: true },
    isCritical: { type: Boolean, default: false, required: true },
    patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
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

export default model<I_VitalData>("VitalData", vitalDataSchema);
