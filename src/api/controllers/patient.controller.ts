import { I_Patient } from "../../interfaces/patient.interfaces";
import PatientRepository from "../repositories/patient.repository";

export default class PatientController {
  private patientRepository = new PatientRepository();

  async create(patient: I_Patient): Promise<I_Patient> {
    const createdPatient = await this.patientRepository.create(patient);

    return createdPatient;
  }

  async getById(patientId: string): Promise<I_Patient> {
    const patient = await this.patientRepository.findById(patientId);

    if (!patient) {
      throw new Error("Patient not found");
    }

    return patient;
  }

  async getAll(): Promise<I_Patient[]> {
    const patients = await this.patientRepository.findAll();

    return patients;
  }

  async update(patientId: string, patientData: I_Patient): Promise<I_Patient> {
    const updatedPatient = await this.patientRepository.updateById(
      patientId,
      patientData
    );

    if (!updatedPatient) {
      throw new Error("Patient not found");
    }

    return updatedPatient;
  }

  async delete(patientId: string): Promise<{ message: string }> {
    const deletedPatient = await this.patientRepository.deleteById(patientId);
    
    if (!deletedPatient) {
      throw new Error("Patient not found");
    }

    return { message: "Patient deleted successfully" };
  }
}
