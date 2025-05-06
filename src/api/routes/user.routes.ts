import express from "express";
import UserController from "../controllers/user.controller";
import { handleError } from "../../utils/err.util";
import { StatusCodeErrorEnum } from "../enums/errors.enum";
import { authenticateToken, authorizeRole } from "../middlewares/auth.middleware";
import { UserRoleEnum } from "../enums/user.enum";

const userRouter = express.Router();
const userController = new UserController();

userRouter.get("/", authenticateToken, async (req, res) => {
  try {
    const userList = await userController.getAll();
    res.status(200).send({ status: "SUCCESS", data: userList });
  } catch (err) {
    handleError(
      err,
      res,
      "An error occurred while fetching users",
      StatusCodeErrorEnum.INTERNAL_SERVER_ERROR
    );
  }
});

userRouter.get("/:id", authenticateToken, async (req, res) => {
  try {
    const user = await userController.getById(req.params.id);
    res.status(200).send({ status: "SUCCESS", data: user });
  } catch (err) {
    handleError(
      err,
      res,
      "There was an error finding the user by ID",
      StatusCodeErrorEnum.NOT_FOUND
    );
  }
});

userRouter.get("/email/:email", authenticateToken, async (req, res) => {
  try {
    const user = await userController.getByEmail(req.params.email);
    res.status(200).send({ status: "SUCCESS", data: user });
  } catch (err) {
    handleError(
      err,
      res,
      "There was an error finding the user by email",
      StatusCodeErrorEnum.NOT_FOUND
    );
  }
});

userRouter.post("/", authenticateToken, authorizeRole(UserRoleEnum.ADMIN), async (req, res) => {
  try {
    const createdUser = await userController.create(req.body);
    res.status(201).send({ status: "SUCCESS", data: createdUser });
  } catch (err) {
    handleError(
      err,
      res,
      "An error occurred while creating the user",
      StatusCodeErrorEnum.BAD_REQUEST
    );
  }
});

userRouter.put("/:id", authenticateToken, async (req, res) => {
  try {
    const updatedUser = await userController.update(req.params.id, req.body);
    res.status(200).send({ status: "SUCCESS", data: updatedUser });
  } catch (err) {
    handleError(
      err,
      res,
      "An error occurred while updating the user",
      StatusCodeErrorEnum.NOT_FOUND
    );
  }
});

userRouter.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const result = await userController.delete(req.params.id);
    res.status(200).send({ status: "SUCCESS", message: result.message });
  } catch (err) {
    handleError(
      err,
      res,
      "An error occurred while deleting the user by ID",
      StatusCodeErrorEnum.NOT_FOUND
    );
  }
});

export default userRouter;
