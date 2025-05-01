import express from "express";
import patientRouter from "./patient.route";
import vitalDataRouter from "./vitalData.route";

const router = express.Router();

router.use("/patient", patientRouter);
router.use("/vital", vitalDataRouter);

export default router;