# BookMatch 📚

**BookMatch** é uma plataforma inovadora de recomendação de livros que conecta leitores com suas próximas leituras favoritas. Utilizando preferências de usuários, avaliações e dados de APIs externas, o sistema oferece recomendações personalizadas e permite aos leitores explorar, avaliar e organizar suas leituras.

---

## 🚀 Funcionalidades

- 🌟 **Autenticação de Usuários**
  - Cadastro e login com suporte a autenticação JWT.
- 📚 **Gerenciamento de Livros**
  - Busca de livros por gênero, autor, e título.
  - Listagem de detalhes e recomendações de livros.
- 💬 **Avaliação e Comentários**
  - Avaliação de livros com notas (1-5 estrelas) e comentários.
- 🤖 **Recomendações Personalizadas**
  - Sugestões baseadas em preferências de leitura e histórico de avaliações.
- 🔍 **Filtros Avançados**
  - Encontrar livros por critérios específicos, como gênero, autor, data de publicação, etc.

---

## 🛠️ Tecnologias Utilizadas

### **Frontend**

- [React](https://reactjs.org/) com [TypeScript](https://www.typescriptlang.org/)
- Gerenciamento de estado com React Context API.
- Design responsivo utilizando TailwindCSS ou Material-UI.

### **Backend**

- [Node.js](https://nodejs.org/) com [Express](https://expressjs.com/)
- Banco de dados PostgreSQL.
- Integração com APIs externas (ex.: Google Books API).
- Configuração de autenticação segura com JWT.

### **Infraestrutura**

- [Docker](https://www.docker.com/) para ambiente de desenvolvimento.
- Deploy escalável utilizando serviços como AWS ou Vercel.

---

### **Configuração Local**

#### **Pré-requisitos**

Certifique-se de ter os seguintes itens instalados no seu ambiente:

- [Node.js](https://nodejs.org/) (recomendado: versão 16 ou superior)
- [Docker](https://www.docker.com/) (para rodar o banco de dados PostgreSQL)
- [Postman](https://www.postman.com/) ou outra ferramenta para testar a API.

---

#### **Instruções para Configuração**

```bash
1. Clone o Repositório
   git clone....
   cd bookmatch

2. Configure o Backend
   # Navegue até o diretório do backend
   cd backend

   # Crie o arquivo .env com as seguintes variáveis
   echo "DATABASE_URL=postgres://devuser:devpassword@localhost:5433/bookmatch
   JWT_SECRET=mysecretkey
   PORT=3000" > .env

3. Suba o Banco de Dados com Docker
   docker-compose up -d

4. Instale as Dependências
   npm install

5. Inicie o Servidor
   npm run dev

6. Teste a Conexão
   # Use Postman ou um navegador para acessar a rota
   GET http://localhost:3000
```
