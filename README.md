# Documentação do Projeto

Este projeto é uma API para gestão de utilizadores, incluindo endpoints para criar, listar, atualizar e apagar utilizadores. A aplicação foi desenvolvida em Node.js com Express e utiliza uma base de dados PostgreSQL.

---

## Estrutura do Projeto

```
.
├── migrations/                # Ficheiros SQL para criação de tabelas
├── node_modules/              # Dependências instaladas
├── docker-compose-dev.yml     # Configuração Docker para desenvolvimento
├── docker-compose-prod.yml    # Configuração Docker para produção
├── package.json               # Definições e scripts do projeto
├── server.js                  # Ficheiro principal da aplicação
└── README.md                  # Documentação do projeto
```

---

## Como Configurar o Projeto

### 1. Clonar o Repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_REPOSITORIO>
```

### 2. Instalar Dependências

Certifique-se de ter o Node.js instalado. Depois, instale as dependências com:

```bash
npm install
```

### 3. Configurar Variáveis de Ambiente

Crie um ficheiro `.env` com o seguinte conteúdo e substitua pelos valores adequados:

```
POSTGRES_USER=seu_utilizador
POSTGRES_PASSWORD=sua_password
POSTGRES_DB=sua_base_de_dados
PORT=4000
```

---

## Como Utilizar com Docker

Este projeto inclui duas configurações principais de Docker: uma para desenvolvimento e outra para produção.

### 1. Ambiente de Desenvolvimento

Para iniciar o ambiente de desenvolvimento:

```bash
npm run dev:docker
```

Ou, para acompanhar os logs:

```bash
npm run dev:docker:logs
```

#### O que acontece no ambiente de desenvolvimento:
- O código é montado dinamicamente para refletir alterações.
- Uma base de dados PostgreSQL é iniciada.
- O servidor está disponível em [http://localhost:4000](http://localhost:4000).

### 2. Ambiente de Produção

Para iniciar o ambiente de produção:

```bash
npm run prod:docker
```

Ou, para iniciar em background:

```bash
npm run prod:docker:logs
```

#### O que acontece no ambiente de produção:
- O código é construído e otimizado.
- Uma base de dados PostgreSQL é iniciada com dados persistentes.
- O servidor está disponível em [http://localhost:4000](http://localhost:4000).

---

## Endpoints da API

### 1. Verificação da API
**GET /**
- Resposta: `Funciona isto!`

### 2. Listar Utilizadores
**GET /users**
- Resposta: Lista de todos os utilizadores.

### 3. Criar Utilizador
**POST /users**
- Corpo:
```json
{
  "nome": "string",
  "email": "string",
  "year": "integer"
}
```
- Resposta: Utilizador criado.

### 4. Atualizar Utilizador
**PUT /users/{id}**
- Parâmetros:
  - `id`: ID do utilizador.
- Corpo:
```json
{
  "nome": "string",
  "email": "string",
  "year": "integer"
}
```
- Resposta: Utilizador atualizado ou erro caso não seja encontrado.

### 5. Apagar Utilizador
**DELETE /users/{id}**
- Parâmetros:
  - `id`: ID do utilizador.
- Resposta: Confirmação de remoção ou erro caso não seja encontrado.

---

## Como Contribuir

1. Crie uma nova branch para as suas alterações:
```bash
git checkout -b minha-branch
```

2. Faça commit das suas alterações:
```bash
git commit -m "Descrição das alterações"
```

3. Submeta a sua branch para revisão:
```bash
git push origin minha-branch
```

---

## Licença

Este projeto está licenciado sob a licença ISC.

