import { Router } from "express";
import {
  getUser,
  updateUser,
  deleteUser,
  listUsers,
  updateUserPassword,
} from "../controllers/userController";

export const userRoutes = Router();

userRoutes.get("/", listUsers);
userRoutes.get("/:id", getUser);
userRoutes.put("/:id", updateUser);
userRoutes.put("/:id/password", updateUserPassword);
userRoutes.delete("/:id", deleteUser);
