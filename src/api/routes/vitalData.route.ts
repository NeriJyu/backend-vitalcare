import express from "express";
import VitalDataController from "../controllers/vitalData.controller";
import { handleError } from "../../utils/err.util";
import { StatusCodeErrorEnum } from "../enums/errors.enum";
import { authenticateToken } from "../middlewares/auth.middleware";

const vitalDataRouter = express.Router();
const vitalDataController = new VitalDataController();

vitalDataRouter.get("/", authenticateToken, async (req, res) => {
  try {
    const vitalDataList = await vitalDataController.getAll();
    res.status(200).send({ status: "SUCCESS", data: vitalDataList });
  } catch (err) {
    handleError(
      err,
      res,
      "An error occurred while fetching vital data",
      StatusCodeErrorEnum.INTERNAL_SERVER_ERROR
    );
  }
});

vitalDataRouter.get("/:id", authenticateToken, async (req, res) => {
  try {
    const vitalData = await vitalDataController.getById(req.params.id);
    res.status(200).send({ status: "SUCCESS", data: vitalData });
  } catch (err) {
    handleError(
      err,
      res,
      "There was an error finding vital data by ID",
      StatusCodeErrorEnum.NOT_FOUND
    );
  }
});

vitalDataRouter.get(
  "/patient/:patientId",
  authenticateToken,
  async (req, res) => {
    try {
      const vitalDataList = await vitalDataController.getByPatientId(
        req.params.patientId
      );
      res.status(200).send({ status: "SUCCESS", data: vitalDataList });
    } catch (err) {
      handleError(
        err,
        res,
        "An error occurred while fetching vital data by patient ID",
        StatusCodeErrorEnum.NOT_FOUND
      );
    }
  }
);

vitalDataRouter.post("/", authenticateToken, async (req, res) => {
  try {
    const createdVital = await vitalDataController.create(req.body);
    res.status(201).send({ status: "SUCCESS", data: createdVital });
  } catch (err) {
    handleError(
      err,
      res,
      "An error occurred while creating vital data",
      StatusCodeErrorEnum.BAD_REQUEST
    );
  }
});

vitalDataRouter.put("/:id", authenticateToken, async (req, res) => {
  try {
    const updatedVital = await vitalDataController.update(
      req.params.id,
      req.body
    );
    res.status(200).send({ status: "SUCCESS", data: updatedVital });
  } catch (err) {
    handleError(
      err,
      res,
      "An error occurred while updating vital data",
      StatusCodeErrorEnum.NOT_FOUND
    );
  }
});

vitalDataRouter.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const result = await vitalDataController.delete(req.params.id);
    res.status(200).send({ status: "SUCCESS", message: result.message });
  } catch (err) {
    handleError(
      err,
      res,
      "An error occurred while deleting vital data by ID",
      StatusCodeErrorEnum.NOT_FOUND
    );
  }
});

export default vitalDataRouter;
