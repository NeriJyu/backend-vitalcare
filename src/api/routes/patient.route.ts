import express from "express";
import PatientController from "../controllers/patient.controller";
import { handleError } from "../../utils/err.util";

const patientRouter = express.Router();
const patientController = new PatientController();

patientRouter.get("/", async (req, res) => {
  try {
    const patients = await patientController.getAll();
    res.status(200).send({ status: "SUCCESS", data: patients });
  } catch (err) {
    handleError(err, res, "An error occurred while fetching patients");
  }
});

patientRouter.get("/:id", async (req, res) => {
  try {
    const patient = await patientController.getById(req.params.id);
    res.status(200).send({ status: "SUCCESS", data: patient });
  } catch (err) {
    handleError(err, res, "An error occurred while fetching the patient by ID");
  }
});

patientRouter.post("/", async (req, res) => {
  try {
    console.log("req.body: ", req.body)
    const createdPatient = await patientController.create(req.body);
    res.status(201).send({ status: "SUCCESS", data: createdPatient });
  } catch (err) {
    handleError(err, res, "An error occurred while creating the patient");
  }
});

patientRouter.put("/:id", async (req, res) => {
  try {
    const updatedPatient = await patientController.update(req.params.id, req.body);
    res.status(200).send({ status: "SUCCESS", data: updatedPatient });
  } catch (err) {
    handleError(err, res, "An error occurred while updating the patient");
  }
});

patientRouter.delete("/:id", async (req, res) => {
  try {
    const result = await patientController.delete(req.params.id);
    res.status(200).send({ status: "SUCCESS", message: result.message });
  } catch (err) {
    handleError(err, res, "An error occurred while deleting the patient");
  }
});

export default patientRouter;