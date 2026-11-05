# Oficina - API Node.js

## Configuração

1. Copie `.env.example` para `.env` e configure MySQL/JWT.
2. Importe `database/schema.sql` no MySQL.
3. Execute `npm install` e `npm start`.
4. Abra `http://localhost:3000`.

Dados de acesso configurados para testes:

- E-mail: `monique.fonseca@gmail.com`
- Senha: `123456`

## Rotas

- `POST /login` — público
- `/clientes`, `/veiculos`, `/agendamentos` — exigem `Authorization: Bearer <token>`
