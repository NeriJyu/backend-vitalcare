import express from "express";
import patientRouter from "./patient.route";
import vitalDataRouter from "./vitalData.route";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import authRouter from "./auth.route";
import userRouter from "./user.routes";

const router = express.Router();
const swaggerDocument = YAML.load("./src/docs/swagger.yaml");

router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.use("/login", authRouter);
router.use("/patient", patientRouter);
router.use("/vital", vitalDataRouter);
router.use("/user", userRouter);

export default router;
