import axios from "axios";

const GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";
const API_KEY = process.env.GOOGLE_BOOKS_API_KEY;

export const searchBooks = async (query: string, maxResults: number = 10) => {
  try {
    // Lógica para buscar por ID específico
    const isIdQuery = query.startsWith("id:");
    const url = isIdQuery
      ? `${GOOGLE_BOOKS_API_URL}/${query.split(":")[1]}`
      : GOOGLE_BOOKS_API_URL;

    const params = isIdQuery
      ? { key: API_KEY }
      : { q: query, maxResults, key: API_KEY };

    const response = await axios.get(url, { params });

    // Se for por ID, retorne apenas o item único
    if (isIdQuery) {
      const item = response.data;
      return [
        {
          id: item.id,
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors || [],
          publisher: item.volumeInfo.publisher,
          publishedDate: item.volumeInfo.publishedDate,
          description: item.volumeInfo.description,
          categories: item.volumeInfo.categories || [],
          imageLinks: item.volumeInfo.imageLinks?.thumbnail,
          infoLink: item.volumeInfo.infoLink,
        },
      ];
    }

    // Para consultas normais, retorne uma lista
    return response.data.items.map((item: any) => ({
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors || [],
      publisher: item.volumeInfo.publisher,
      publishedDate: item.volumeInfo.publishedDate,
      description: item.volumeInfo.description,
      categories: item.volumeInfo.categories || [],
      imageLinks: item.volumeInfo.imageLinks?.thumbnail,
      infoLink: item.volumeInfo.infoLink,
    }));
  } catch (err) {
    console.error("Erro ao buscar livros:", err);
    throw new Error("Não foi possível buscar livros no momento.");
  }
};
