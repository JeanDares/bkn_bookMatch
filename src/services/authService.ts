import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  // Salvar no banco (a ser implementado)
  return { id: 1, name, email };
};

export const authenticateUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  // Verificar credenciais no banco (a ser implementado)
  const token = jwt.sign({ email }, process.env.JWT_SECRET || "secret", {
    expiresIn: "1h",
  });
  return token;
};
