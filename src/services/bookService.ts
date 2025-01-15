import axios from "axios";

const GOOGLE_BOOKS_API_URL = process.env.GOOGLE_BOOKS_API_URL;
const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

if (!GOOGLE_BOOKS_API_URL) {
  throw new Error("GOOGLE_BOOKS_API_URL não está configurada.");
}

if (!API_KEY) {
  throw new Error("GOOGLE_BOOKS_API_KEY não está configurada.");
}

export const searchBooks = async (query: string, maxResults: number = 10) => {
  try {
    // Determina se é uma busca por ID
    const isIdQuery = query.startsWith("id:");
    const bookId = isIdQuery ? query.split(":")[1] : null;

    // Validação para evitar erro de URL inválida
    if (isIdQuery && !bookId) {
      throw new Error("ID do livro inválido.");
    }

    const url = isIdQuery
      ? `${GOOGLE_BOOKS_API_URL}/${bookId}`
      : GOOGLE_BOOKS_API_URL;

    const params = isIdQuery
      ? { key: API_KEY }
      : { q: query, maxResults, key: API_KEY };

    const response = await axios.get(url, { params });

    // Se for uma busca por ID, retorne o item único
    if (isIdQuery) {
      const item = response.data;
      return [
        {
          id: item.id,
          title: item.volumeInfo?.title || "Título não disponível",
          authors: item.volumeInfo?.authors || [],
          publisher: item.volumeInfo?.publisher || "Editora não disponível",
          publishedDate:
            item.volumeInfo?.publishedDate || "Data não disponível",
          description:
            item.volumeInfo?.description || "Descrição não disponível",
          categories: item.volumeInfo?.categories || [],
          imageLinks: item.volumeInfo?.imageLinks?.thumbnail || null,
          infoLink: item.volumeInfo?.infoLink || null,
        },
      ];
    }

    // Para consultas gerais, valide e retorne uma lista
    if (!response.data.items || response.data.items.length === 0) {
      return [];
    }

    return response.data.items.map((item: any) => ({
      id: item.id,
      title: item.volumeInfo?.title || "Título não disponível",
      authors: item.volumeInfo?.authors || [],
      publisher: item.volumeInfo?.publisher || "Editora não disponível",
      publishedDate: item.volumeInfo?.publishedDate || "Data não disponível",
      description: item.volumeInfo?.description || "Descrição não disponível",
      categories: item.volumeInfo?.categories || [],
      imageLinks: item.volumeInfo?.imageLinks?.thumbnail || null,
      infoLink: item.volumeInfo?.infoLink || null,
    }));
  } catch (err) {
    console.error("Erro ao buscar livros:", err);
    throw new Error("Não foi possível buscar livros no momento.");
  }
};
