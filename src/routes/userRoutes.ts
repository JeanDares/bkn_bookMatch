import { Router } from "express";
import {
  getUser,
  updateUser,
  deleteUser,
  listUsers,
  updateUserPassword,
} from "../controllers/userController";
import { authenticate } from "../middlewares/authenticate";

export const userRoutes = Router();

userRoutes.get("/", listUsers);
userRoutes.get("/:id", authenticate, getUser);
userRoutes.put("/:id", updateUser);
userRoutes.put("/:id/password", updateUserPassword);
userRoutes.delete("/:id", deleteUser);
