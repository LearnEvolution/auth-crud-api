🔐 Auth API Node.js

API REST completa com autenticação JWT, controle de acesso e CRUD de pedidos.
Projeto desenvolvido com foco em aplicações reais e uso profissional.

---

🚀 Tecnologias

- Node.js
- Express
- MongoDB (Mongoose)
- JWT (JSON Web Token)
- Bcrypt

---

📦 Funcionalidades

- Cadastro de usuário
- Login com geração de token JWT
- Rotas protegidas com autenticação
- CRUD de pedidos (itens)
- Controle de acesso por usuário
- Middleware de autorização

---

🔐 Autenticação

A API utiliza JWT para proteger rotas privadas.

Exemplo de uso no header:

Authorization: Bearer SEU_TOKEN

---

▶️ Como rodar o projeto

npm install
npm start

Servidor rodando em:

http://localhost:10000

---

⚙️ Variáveis de ambiente

Crie um arquivo ".env" na raiz:

MONGO_URI=sua_string_mongodb
JWT_SECRET=seu_segredo

---

📌 Endpoints principais

🔑 Auth

- "POST /api/auth/register"
- "POST /api/auth/login"

📦 Itens (protegido)

- "GET /api/items"
- "POST /api/items"
- "PUT /api/items/:id"
- "DELETE /api/items/:id"

---

🧪 Exemplo de requisição

curl -X POST http://localhost:10000/api/auth/login \
-H "Content-Type: application/json" \
-d '{"email":"teste@email.com","password":"123456"}'

---

📌 Status

✔ Projeto funcional
✔ Pronto para uso como base de sistemas reais

---

👨‍💻 Autor

Cleber Almeida
Backend Developer em formação (Node.js)
