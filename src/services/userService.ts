import pool from "../config/database";
import bcrypt from "bcrypt";
import { User } from "../types/app";

export const getUserById = async (id: number) => {
  const result = await pool.query("SELECT * FROM Users WHERE id = $1", [id]); // Faz a query no banco
  return result.rows[0]; // Retorna o primeiro resultado
};

export const getAllUsers = async () => {
  try {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
  } catch (err) {
    throw new Error("Erro ao buscar usuários: " + (err as Error).message);
  }
};

/**
 * @param id ID do usuário a ser atualizado
 * @param name Novo nome do usuário
 * @param email Novo email do usuário
 */
export const updateUserById = async (
  id: number,
  name?: string,
  email?: string,
  preferences?: Record<string, any>
): Promise<User> => {
  const result = await pool.query(
    "UPDATE users SET name = $1, email = $2, preferences = $3 WHERE id = $4 RETURNING *",
    [name, email, preferences, id]
  );

  if (result.rowCount === 0) {
    throw new Error("Usuário não encontrado.");
  }

  return result.rows[0];
};

/**
 * @param id ID do usuário
 * @param oldPassword Senha antiga do usuário
 * @param newPassword Nova senha do usuário
 */
export const updatePassword = async (
  id: number,
  oldPassword: string,
  newPassword: string
) => {
  try {
    // Buscar a senha atual do banco
    const result = await pool.query(
      "SELECT password FROM users WHERE id = $1",
      [id]
    );
    const user = result.rows[0];

    if (!user) {
      throw new Error("Usuário não encontrado.");
    }

    // Verificar se a senha antiga está correta
    const isPasswordValid = await bcrypt.compare(
      oldPassword,
      user.password_hash
    );
    if (!isPasswordValid) {
      throw new Error("Senha antiga incorreta.");
    }

    // Criptografar a nova senha
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Atualizar a senha no banco de dados
    await pool.query("UPDATE users SET password = $1 WHERE id = $2", [
      hashedPassword,
      id,
    ]);

    return { message: "Senha atualizada com sucesso." };
  } catch (err) {
    throw new Error("Erro ao atualizar senha: " + (err as Error).message);
  }
};

export const saveUserPreferences = async (
  userId: number,
  preferences: string[]
) => {
  try {
    console.log("Salvando preferências:", JSON.stringify(preferences)); // Log para depuração

    const result = await pool.query(
      "UPDATE users SET preferences = $1 WHERE id = $2 RETURNING *",
      [JSON.stringify(preferences), userId] // Serializa o array para JSON
    );

    if (result.rowCount === 0) {
      throw new Error("Usuário não encontrado.");
    }

    return result.rows[0];
  } catch (err) {
    console.error("Erro ao salvar preferências:", err); // Log do erro
    throw new Error("Erro ao salvar preferências: " + (err as Error).message);
  }
};
