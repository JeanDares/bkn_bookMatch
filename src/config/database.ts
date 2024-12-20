import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool
  .connect()
  .then(() => console.log("Conectado ao banco de dados!"))
  .catch((err: any) => console.error("Erro ao conectar ao banco:", err));

export default pool;
