import pool from "../config/database";

export const getUserById = async (id: number) => {
  const result = await pool.query("SELECT * FROM Users WHERE id = $1", [id]); // Faz a query no banco
  return result.rows[0]; // Retorna o primeiro resultado
};
