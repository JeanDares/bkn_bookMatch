import { Request, Response } from "express";
import { searchBooks } from "../services/bookService";

/**
 * Lista livros com base em filtros de gênero e autor usando a Google Books API.
 * @param req Objeto de requisição do Express.
 * @param res Objeto de resposta do Express.
 */
export const listBooks = async (req: Request, res: Response) => {
  const { genre, author } = req.query;

  if (!genre && !author) {
    return res.status(400).json({
      message: "Por favor, forneça pelo menos um filtro: gênero ou autorrrrr.",
    });
  }

  try {
    const query = `${genre ? `subject:${genre}` : ""} ${
      author ? `inauthor:${author}` : ""
    }`.trim();

    const books = await searchBooks(query);
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
