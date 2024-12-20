import { Router } from "express";
import { listBooks, getBookDetails } from "../controllers/bookController";

export const bookRoutes = Router();

// Rota para listar livros com filtros (gênero, autor, etc.)
bookRoutes.get("/", listBooks);

// Rota para obter detalhes de um livro pelo ID
bookRoutes.get("/:id", getBookDetails);
