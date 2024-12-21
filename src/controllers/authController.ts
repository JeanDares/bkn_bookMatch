import { Request, Response } from "express";
import { registerUserService } from "../services/authService";

/**
 * Controlador para registrar um novo usuário.
 * @param req Objeto de requisição do Express.
 * @param res Objeto de resposta do Express.
 */
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios." });
  }

  try {
    const user = await registerUserService(name, email, password);

    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({
      message: "Usuário registrado com sucesso.",
      user: userWithoutPassword,
    });
  } catch (err: unknown) {
    res.status(500).json({
      message: "Erro ao registrar o usuário.",
      error: (err as Error).message,
    });
  }
};

export const login = async (req: Request, res: Response) => {};
