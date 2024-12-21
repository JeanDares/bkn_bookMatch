import { Router } from "express";
import { listBooks, getBookDetails } from "../controllers/bookController";

export const bookRoutes = Router();

// Lista livros com filtros de gênero ou autor
bookRoutes.get("/", listBooks);

// Detalhes de um livro pelo ID
bookRoutes.get("/:id", getBookDetails);
