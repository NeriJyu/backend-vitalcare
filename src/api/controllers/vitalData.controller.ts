import { I_VitalData } from "../../interfaces/vitalData.interfaces";
import VitalDataRepository from "../repositories/vitalData.repository";

export default class VitalDataController {
  private vitalDataRepository = new VitalDataRepository();

  async create(vital: I_VitalData): Promise<I_VitalData> {
    const createdVital = await this.vitalDataRepository.create(vital);

    return createdVital;
  }

  async getById(vitalDataId: string): Promise<I_VitalData> {
    const vitalData = await this.vitalDataRepository.findById(vitalDataId);
    
    if (!vitalData) {
      throw new Error("Vital data not found");
    }

    return vitalData;
  }

  async getAll(): Promise<I_VitalData[]> {
    const vitalDataList = await this.vitalDataRepository.findAll();

    return vitalDataList;
  }

  async getByPatientId(patientId: string): Promise<I_VitalData[]> {
    const vitalDataList = await this.vitalDataRepository.findByPatientId(
      patientId
    );

    return vitalDataList;
  }

  async update(
    vitalDataId: string,
    vitalData: I_VitalData
  ): Promise<I_VitalData> {
    const updatedVitalData = await this.vitalDataRepository.updateById(
      vitalDataId,
      vitalData
    );

    if (!updatedVitalData) {
      throw new Error("Vital data not found");
    }

    return updatedVitalData;
  }

  async delete(vitalDataId: string): Promise<{ message: string }> {
    const deletedVitalData = await this.vitalDataRepository.deleteById(
      vitalDataId
    );

    if (!deletedVitalData) {
      throw new Error("Vital data not found");
    }

    return { message: "Vital data deleted successfully" };
  }
}
