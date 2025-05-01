import Patient from "../models/patient.model";
import { I_Patient } from "../../interfaces/patient.interfaces";

export default class PatientRepository {
  async create(patientData: I_Patient): Promise<I_Patient> {
    try {
      const patient = new Patient(patientData);
      return await patient.save();
    } catch (error) {
      throw new Error(`Error creating patient: ${error.message}`);
    }
  }

  async findById(patientId: string): Promise<I_Patient | null> {
    try {
      return await Patient.findById(patientId).exec();
    } catch (error) {
      throw new Error(`Error finding patient by ID: ${error.message}`);
    }
  }

  async findAll(): Promise<I_Patient[]> {
    try {
      return await Patient.find().exec();
    } catch (error) {
      throw new Error(`Error finding all patients: ${error.message}`);
    }
  }

  async updateById(patientId: string, updateData: Partial<I_Patient>): Promise<I_Patient | null> {
    try {
      return await Patient.findByIdAndUpdate(patientId, updateData, { new: true }).exec();
    } catch (error) {
      throw new Error(`Error updating patient by ID: ${error.message}`);
    }
  }

  async deleteById(patientId: string): Promise<I_Patient | null> {
    try {
      return await Patient.findByIdAndDelete(patientId).exec();
    } catch (error) {
      throw new Error(`Error deleting patient by ID: ${error.message}`);
    }
  }
}
