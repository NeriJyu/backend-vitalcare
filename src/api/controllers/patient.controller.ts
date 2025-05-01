import PatientRepository from "../repositories/patient.repository";

export default class PatientController {
  private patientRepository = new PatientRepository();

  create(patient: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const createdPatient = await this.patientRepository.create(patient);
        resolve(createdPatient);
      } catch (err) {
        reject(err);
      }
    });
  }

  getById(patientId: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const patient = await this.patientRepository.findById(patientId);
        if (!patient) {
          return reject(new Error("Patient not found"));
        }
        resolve(patient);
      } catch (err) {
        reject(err);
      }
    });
  }

  getAll(): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const patients = await this.patientRepository.findAll();
        resolve(patients);
      } catch (err) {
        reject(err);
      }
    });
  }

  update(patientId: string, patientData: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const updatedPatient = await this.patientRepository.updateById(
          patientId,
          patientData
        );
        if (!updatedPatient) {
          return reject(new Error("Patient not found"));
        }
        resolve(updatedPatient);
      } catch (err) {
        reject(err);
      }
    });
  }

  delete(patientId: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const deletedPatient = await this.patientRepository.deleteById(
          patientId
        );
        if (!deletedPatient) {
          return reject(new Error("Patient not found"));
        }
        resolve({ message: "Patient deleted successfully" });
      } catch (err) {
        reject(err);
      }
    });
  }
}
