import VitalData from "../models/vitalData.model";
import { I_VitalData } from "../../interfaces/vitalData.interfaces";

export default class VitalDataRepository {
  async create(vitalData: I_VitalData): Promise<I_VitalData> {
    try {
      const newVitalData = new VitalData(vitalData);
      return await newVitalData.save();
    } catch (error) {
      throw new Error(`Error creating vital data: ${error.message}`);
    }
  }

  async findById(vitalDataId: string): Promise<I_VitalData | null> {
    try {
      return await VitalData.findById(vitalDataId).exec();
    } catch (error) {
      throw new Error(`Error finding vital data by ID: ${error.message}`);
    }
  }

  async findAll(): Promise<I_VitalData[]> {
    try {
      return await VitalData.find().exec();
    } catch (error) {
      throw new Error(`Error finding all vital data: ${error.message}`);
    }
  }

  async findByPatientId(patientId: string): Promise<I_VitalData[]> {
    try {
      return await VitalData.find({ patientId }).exec();
    } catch (error) {
      throw new Error(`Error finding vital data by patient ID: ${error.message}`);
    }
  }

  async updateById(vitalDataId: string, updateData: Partial<I_VitalData>): Promise<I_VitalData | null> {
    try {
      return await VitalData.findByIdAndUpdate(vitalDataId, updateData, { new: true }).exec();
    } catch (error) {
      throw new Error(`Error updating vital data by ID: ${error.message}`);
    }
  }

  async deleteById(vitalDataId: string): Promise<I_VitalData | null> {
    try {
      return await VitalData.findByIdAndDelete(vitalDataId).exec();
    } catch (error) {
      throw new Error(`Error deleting vital data by ID: ${error.message}`);
    }
  }
}