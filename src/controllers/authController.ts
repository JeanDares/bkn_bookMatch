import { Request, Response } from "express";
import { registerUser, authenticateUser } from "../services/authService";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const user = await registerUser({ name, email, password });
  res.status(201).json(user);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const token = await authenticateUser({ email, password });
  res.status(200).json({ token });
};
