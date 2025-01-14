import { Request, Response } from "express";
import pool from "../config/database";
import {
  getAllUsers,
  getUserById,
  updatePassword,
  updateUserById,
} from "../services/userService";
import { log } from "node:console";
import { UpdateUserRequest } from "../types/app";

export const getUser = async (req: Request, res: Response) => {
  try {
    console.log(req.params, "params");
    const { id } = req.params;
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ message: "ID inválido" });
    }
    const user = await getUserById(parseInt(id));
    if (!user)
      return res.status(404).json({ message: "Usuário não encontrado" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar o usuário", error: err });
  }
};

export const updateUser = async (
  req: Request<{ id: string }, {}, UpdateUserRequest>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { name, email, preferences } = req.body;

    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ message: "ID inválido." });
    }

    const updatedUser = await updateUserById(
      parseInt(id),
      name,
      email,
      preferences
    );
    res
      .status(200)
      .json({ message: "Usuário atualizado com sucesso.", user: updatedUser });
  } catch (err) {
    res.status(500).json({
      message: "Erro ao atualizar o usuário.",
      error: (err as Error).message,
    });
  }
};

export const updateUserPassword = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword } = req.body;

    // Validações básicas
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ message: "ID inválido." });
    }

    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "As senhas são obrigatórias." });
    }

    // Chama o serviço para atualizar a senha
    const result = await updatePassword(parseInt(id), oldPassword, newPassword);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({
      message: "Erro ao atualizar a senha.",
      error: (err as Error).message,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  // Lógica para excluir o usuário do banco
  res.status(200).json({ message: `Usuário com ID ${id} excluído.` });
};

export const listUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      message: "Erro ao listar os usuários.",
      error: (err as Error).message,
    });
  }
};
