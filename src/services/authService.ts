import bcrypt from "bcrypt";
import pool from "../config/database";
import jwt from "jsonwebtoken";

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

export const loginUser = async (email: string, password: string) => {
  try {
    console.log(`[INFO]: Tentativa de login para o email: ${email}`);

    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    if (!user) {
      console.error(`[ERROR]: Usuário não encontrado: ${email}`);
      throw new Error("Usuário ou senha inválidos.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.error(`[ERROR]: Senha inválida para o email: ${email}`);
      throw new Error("Usuário ou senha inválidos.");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email }, // Payload do token
      process.env.JWT_SECRET!, // Chave secreta (definida no .env)
      { expiresIn: "1h" } // Expiração do token
    );

    console.log(`[SUCCESS]: Login bem-sucedido para o email: ${email}`);
    return { token, user };
  } catch (err) {
    console.error(`[ERROR]: Erro ao fazer login: ${(err as Error).message}`);
    throw new Error((err as Error).message || "Erro ao fazer login.");
  }
};
