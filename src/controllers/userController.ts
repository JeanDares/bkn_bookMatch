import { Request, Response } from "express";
import pool from "../config/database";
import { getUserById } from "../services/userService";
import { log } from "node:console";

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

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;
  // Lógica para atualizar o usuário no banco
  res.status(200).json({ id, name, email });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  // Lógica para excluir o usuário do banco
  res.status(200).json({ message: `Usuário com ID ${id} excluído.` });
};
