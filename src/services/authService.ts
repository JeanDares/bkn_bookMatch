import bcrypt from "bcrypt";
import pool from "../config/database";

/**
 * Serviço para registrar um novo usuário.
 * @param name Nome do usuário.
 * @param email Email do usuário.
 * @param password Senha do usuário.
 * @returns O usuário criado ou lança um erro.
 */
export const registerUserService = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const emailExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (emailExists.rows.length > 0) {
      throw new Error("O email já está em uso.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword]
    );

    return newUser.rows[0];
  } catch (err) {
    throw new Error((err as Error).message || "Erro ao registrar o usuário.");
  }
};
