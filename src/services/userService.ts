import pool from "../config/database";
import bcrypt from "bcrypt";

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
  name: string,
  email: string
) => {
  try {
    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [name, email, id]
    );

    if (result.rowCount === 0) {
      throw new Error("Usuário não encontrado.");
    }

    return result.rows[0]; // Retorna o usuário atualizado
  } catch (err) {
    throw new Error("Erro ao atualizar o usuário: " + (err as Error).message);
  }
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
