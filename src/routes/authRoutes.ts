import { Router } from "express";
import { login, registerUser } from "../controllers/authController";
import { authenticate } from "../middlewares/authenticate";

export const authRoutes = Router();

authRoutes.post("/login", login);
authRoutes.post("/register", registerUser);
