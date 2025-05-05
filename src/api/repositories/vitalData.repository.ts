import VitalData from "../models/vitalData.model";
import { I_VitalData } from "../../interfaces/vitalData.interfaces";

export default class VitalDataRepository {
  async create(vitalData: I_VitalData): Promise<I_VitalData> {
    const newVitalData = new VitalData(vitalData);
    return await newVitalData.save();
  }

  async findById(vitalDataId: string): Promise<I_VitalData | null> {
    return await VitalData.findById(vitalDataId).exec();
  }

  async findAll(): Promise<I_VitalData[]> {
    return await VitalData.find().exec();
  }

  async findByPatientId(patientId: string): Promise<I_VitalData[]> {
    return await VitalData.find({ patientId }).exec();
  }

  async updateById(
    vitalDataId: string,
    updateData: Partial<I_VitalData>
  ): Promise<I_VitalData | null> {
    return await VitalData.findByIdAndUpdate(vitalDataId, updateData, {
      new: true,
    }).exec();
  }

  async deleteById(vitalDataId: string): Promise<I_VitalData | null> {
    return await VitalData.findByIdAndDelete(vitalDataId).exec();
  }
}
