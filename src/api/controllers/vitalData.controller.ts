import VitalDataRepository from "../repositories/vitalData.repository";

export default class VitalDataController {
  private vitalDataRepository = new VitalDataRepository();

  create(vital: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const createdVital = await this.vitalDataRepository.create(vital);
        resolve(createdVital);
      } catch (err) {
        reject(err);
      }
    });
  }

  getById(vitalDataId: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const vitalData = await this.vitalDataRepository.findById(vitalDataId);
        if (!vitalData) {
          return reject(new Error("Vital data not found"));
        }
        resolve(vitalData);
      } catch (err) {
        reject(err);
      }
    });
  }

  getAll(): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const vitalDataList = await this.vitalDataRepository.findAll();
        resolve(vitalDataList);
      } catch (err) {
        reject(err);
      }
    });
  }

  getByPatientId(patientId: string): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const vitalDataList = await this.vitalDataRepository.findByPatientId(patientId);
        resolve(vitalDataList);
      } catch (err) {
        reject(err);
      }
    });
  }

  update(vitalDataId: string, vitalData: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const updatedVitalData = await this.vitalDataRepository.updateById(vitalDataId, vitalData);
        if (!updatedVitalData) {
          return reject(new Error("Vital data not found"));
        }
        resolve(updatedVitalData);
      } catch (err) {
        reject(err);
      }
    });
  }

  delete(vitalDataId: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const deletedVitalData = await this.vitalDataRepository.deleteById(vitalDataId);
        if (!deletedVitalData) {
          return reject(new Error("Vital data not found"));
        }
        resolve({ message: "Vital data deleted successfully" });
      } catch (err) {
        reject(err);
      }
    });
  }
}