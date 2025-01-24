import { Request, Response } from "express";
import { loginUser, registerUserService } from "../services/authService";

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

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios." });
    }

    const { token, user } = await loginUser(email, password);

    res.status(200).json({
      message: "Usuário logado com sucesso.",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        has_preferences: user.has_preferences,
        preferences: user.preferences,
      },
    });
  } catch (err: unknown) {
    res.status(401).json({
      message: "Erro ao autenticar usuario.",
      error: (err as Error).message,
    });
  }
};
