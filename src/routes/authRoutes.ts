import { Router } from "express";
import { login, register } from "../controllers/authController";

export const authRoutes = Router();

authRoutes.post("/login", login);
authRoutes.post("/register", register);
