import { Request, Response } from "express";

export const listBooks = async (req: Request, res: Response) => {
  const { genre, author } = req.query;
  // Lógica para listar livros com base em filtros
  res.status(200).json([
    { id: 1, title: "Livro A", author: "Autor A", genre: "Ficção" },
    { id: 2, title: "Livro B", author: "Autor B", genre: "Fantasia" },
  ]);
};

export const getBookDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  // Lógica para buscar detalhes de um livro pelo ID
  res
    .status(200)
    .json({ id, title: "Livro A", author: "Autor A", genre: "Ficção" });
};
