import Patient from "../models/patient.model";
import { I_Patient } from "../../interfaces/patient.interfaces";
import userModel from "../models/user.model";
import UserRepository from "./user.repository";

export default class PatientRepository {
  private userRepository = new UserRepository();

  async create(patientData: I_Patient): Promise<I_Patient> {
    const patient = new Patient(patientData);
    return await patient.save();
  }

  async findById(patientId: string): Promise<I_Patient | null> {
    return await Patient.findById(patientId).exec();
  }

  async findAll(): Promise<I_Patient[]> {
    return await Patient.find().exec();
  }

  async updateById(
    patientId: string,
    updateData: Partial<I_Patient>
  ): Promise<I_Patient | null> {
    return await Patient.findByIdAndUpdate(patientId, updateData, {
      new: true,
    }).exec();
  }

  async deleteById(patientId: string): Promise<I_Patient | null> {
    await this.userRepository.findOneAndUpdateByPatientId(patientId);

    return await Patient.findByIdAndDelete(patientId).exec();
  }
}
