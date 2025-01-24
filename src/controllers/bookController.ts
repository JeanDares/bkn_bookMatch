import { Request, Response } from "express";
import { searchBooks } from "../services/bookService";
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { saveUserPreferences } from "../services/userService";
import { AuthenticatedUser } from "../types/app";

interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser; // Usa o tipo definido no arquivo authentication.ts
}

/**
 * Lista livros com base em filtros de gênero e autor usando a Google Books API.
 * @param req Objeto de requisição do Express.
 * @param res Objeto de resposta do Express.
 */
export const listBooks = async (req: Request, res: Response) => {
  const { genre, author, language } = req.query;

  if (!genre && !author) {
    return res.status(400).json({
      message: "Por favor, forneça pelo menos um filtro: gênero ou autor.",
    });
  }

  try {
    // Combinar múltiplos gêneros, se fornecidos
    const genres = genre
      ? (genre as string)
          .split(",")
          .map((g) => `subject:${g}`)
          .join(" ")
      : "";

    const query = `${genres} ${author ? `inauthor:${author}` : ""}`.trim();

    const books = await searchBooks(query, 10);

    res.status(200).json(books);
  } catch (err: unknown) {
    res.status(500).json({
      message: "Erro ao listar livros.",
      error: (err as Error).message,
    });
  }
};

/**
 * Busca os detalhes de um livro pelo ID usando a Google Books API.
 * @param req Objeto de requisição do Express.
 * @param res Objeto de resposta do Express.
 */
export const getBookDetails = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "O ID do livro é obrigatório." });
  }

  try {
    const book = await searchBooks(`id:${id}`);

    if (!book || book.length === 0) {
      return res.status(404).json({ message: "Livro não encontrado." });
    }

    res.status(200).json(book[0]);
  } catch (err) {
    console.error("Erro ao buscar detalhes do livro:", err);
    res.status(500).json({
      message: "Erro ao buscar detalhes do livro.",
      error: (err as Error).message,
    });
  }
};

export const addPreferences = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const userId = req.user?.id;
  const { preferences } = req.body;

  console.log("addPreferences - userId:", userId);
  console.log("addPreferences - preferences:", preferences);

  if (!Array.isArray(preferences)) {
    return res
      .status(400)
      .json({ message: "O campo 'preferences' deve ser um array de strings." });
  }

  try {
    if (userId === undefined) {
      return res.status(400).json({ message: "User ID is required." });
    }
    const user = await saveUserPreferences(userId, preferences);
    res.status(200).json({ message: "Preferências salvas com sucesso.", user });
  } catch (err) {
    res.status(500).json({
      message: "Erro ao salvar preferências.",
      error: (err as Error).message,
    });
  }
};
