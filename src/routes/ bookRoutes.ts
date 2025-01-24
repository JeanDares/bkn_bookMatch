import { Router } from "express";
import {
  listBooks,
  getBookDetails,
  addPreferences,
} from "../controllers/bookController";
import { authenticate } from "../middlewares/authenticate";

export const bookRoutes = Router();

// Lista livros com filtros de gênero ou autor
bookRoutes.get("/", listBooks);

// Detalhes de um livro pelo ID
bookRoutes.get("/:id", getBookDetails);

bookRoutes.post("/preferences", authenticate, addPreferences);
