import express from "express";
import VitalDataController from "../controllers/vitalData.controller";
import { handleError } from "../../utils/err.util";

const vitalDataRouter = express.Router();
const vitalDataController = new VitalDataController();

vitalDataRouter.get("/", async (req, res) => {
  try {
    const vitalDataList = await vitalDataController.getAll();
    res.status(200).send({ status: "SUCCESS", data: vitalDataList });
  } catch (err) {
    handleError(err, res, "An error occurred while fetching vital data");
  }
});

vitalDataRouter.get("/:id", async (req, res) => {
  try {
    const vitalData = await vitalDataController.getById(req.params.id);
    res.status(200).send({ status: "SUCCESS", data: vitalData });
  } catch (err) {
    handleError(err, res, "There was an error finding vital data by ID");
  }
});

vitalDataRouter.get("/patient/:patientId", async (req, res) => {
  try {
    const vitalDataList = await vitalDataController.getByPatientId(req.params.patientId);
    res.status(200).send({ status: "SUCCESS", data: vitalDataList });
  } catch (err) {
    handleError(err, res, "An error occurred while fetching vital data by patient ID");
  }
});

vitalDataRouter.post("/", async (req, res) => {
  try {
    const createdVital = await vitalDataController.create(req.body);
    res.status(201).send({ status: "SUCCESS", data: createdVital });
  } catch (err) {
    handleError(err, res, "An error occurred while creating vital data");
  }
});

vitalDataRouter.put("/:id", async (req, res) => {
  try {
    const updatedVital = await vitalDataController.update(req.params.id, req.body);
    res.status(200).send({ status: "SUCCESS", data: updatedVital });
  } catch (err) {
    handleError(err, res, "An error occurred while updating vital data");
  }
});

vitalDataRouter.delete("/:id", async (req, res) => {
  try {
    const result = await vitalDataController.delete(req.params.id);
    res.status(200).send({ status: "SUCCESS", message: result.message });
  } catch (err) {
    handleError(err, res, "An error occurred while deleting vital data by ID");
  }
});

export default vitalDataRouter;