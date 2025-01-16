# API Documentation

Este documento descreve as rotas da API, incluindo métodos HTTP, parâmetros, corpo da requisição, e exemplos de respostas.

## Base URL

A base URL para todas as requisições da API é:

```
http://localhost:4000
```

## Endpoints

### 1. **GET /users**

Recupera a lista de todos os usuários.

#### Request:

- **Método**: `GET`
- **URL**: `/users`

#### Resposta de Sucesso (200 OK):

```json
[
  {
    "id": 1,
    "name": "João",
    "email": "joao@example.com",
    "year": 1990
  },
  {
    "id": 2,
    "name": "Maria",
    "email": "maria@example.com",
    "year": 1985
  }
]
```

#### Resposta de Erro (500 Internal Server Error):

```json
{
  "error": "Ocorreu um erro no servidor"
}
```

---

### 2. **GET /users/{id}**

Recupera um usuário específico pelo ID.

#### Request:

- **Método**: `GET`
- **URL**: `/users/{id}`
- **Parâmetros de URL**:
  - `id` (obrigatório): ID do usuário a ser recuperado.

#### Exemplo de Requisição:

```
GET /users/1
```

#### Resposta de Sucesso (200 OK):

```json
{
  "id": 1,
  "name": "João",
  "email": "joao@example.com",
  "year": 1990
}
```

#### Resposta de Erro (404 Not Found):

```json
{
  "error": "Usuário não encontrado"
}
```

---

### 3. **POST /users**

Cria um novo usuário.

#### Request:

- **Método**: `POST`
- **URL**: `/users`
- **Corpo da Requisição (JSON)**:

```json
{
  "name": "Pedro",
  "email": "pedro@example.com",
  "year": 1995
}
```

#### Resposta de Sucesso (201 Created):

```json
{
  "id": 3,
  "name": "Pedro",
  "email": "pedro@example.com",
  "year": 1995
}
```

#### Resposta de Erro (400 Bad Request):

```json
{
  "error": "Os campos name, email e year são obrigatórios"
}
```

---

### 4. **PUT /users/{id}**

Atualiza um usuário existente pelo ID.

#### Request:

- **Método**: `PUT`
- **URL**: `/users/{id}`
- **Parâmetros de URL**:
  - `id` (obrigatório): ID do usuário a ser atualizado.
- **Corpo da Requisição (JSON)**:

```json
{
  "name": "Pedro Silva",
  "email": "pedro.silva@example.com",
  "year": 1995
}
```

#### Resposta de Sucesso (200 OK):

```json
{
  "id": 3,
  "name": "Pedro Silva",
  "email": "pedro.silva@example.com",
  "year": 1995
}
```

#### Resposta de Erro (404 Not Found):

```json
{
  "error": "Usuário não encontrado"
}
```

---

### 5. **DELETE /users/{id}**

Deleta um usuário pelo ID.

#### Request:

- **Método**: `DELETE`
- **URL**: `/users/{id}`
- **Parâmetros de URL**:
  - `id` (obrigatório): ID do usuário a ser deletado.

#### Resposta de Sucesso (204 No Content):

A resposta será vazia, indicando que o usuário foi deletado com sucesso.

#### Resposta de Erro (404 Not Found):

```json
{
  "error": "Usuário não encontrado"
}
```

---

## Exemplos de Requisições cURL

### **GET /users**

```bash
curl -X GET http://localhost:4000/users
```

### **GET /users/{id}**

```bash
curl -X GET http://localhost:4000/users/1
```

### **POST /users**

```bash
curl -X POST http://localhost:4000/users -H "Content-Type: application/json" -d '{"name": "Pedro", "email": "pedro@example.com", "year": 1995}'
```

### **PUT /users/{id}**

```bash
curl -X PUT http://localhost:4000/users/1 -H "Content-Type: application/json" -d '{"name": "Pedro Silva", "email": "pedro.silva@example.com", "year": 1995}'
```

### **DELETE /users/{id}**

```bash
curl -X DELETE http://localhost:4000/users/1
```

