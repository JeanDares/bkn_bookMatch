import { Router } from "express";
import { getUser, updateUser, deleteUser } from "../controllers/userController";

export const userRoutes = Router();

// Rota para obter informações de um usuário pelo ID
userRoutes.get("/:id", getUser);

// Rota para atualizar informações do usuário
userRoutes.put("/:id", updateUser);

// Rota para excluir um usuário
userRoutes.delete("/:id", deleteUser);
