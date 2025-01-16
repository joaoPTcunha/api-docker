const express = require("express");
const { Pool } = require("pg");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Users API Documentation",
      version: "1.0.0",
      description: "A simple Users API",
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Development server",
      },
    ],
  },
  apis: ["./server.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *         - year
 *       properties:
 *         nome:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         year:
 *           type: integer
 *           description: The year associated with the user
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Working?
 *     responses:
 *       200:
 *         description: API is working
 */
app.get("/", (req, res) => {
  res.send("Funciona isto!");
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Returns all users
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Users'
 */
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/Users'
 */
app.post("/users", async (req, res) => {
  const { nome, email, year } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO users (nome, email, year) VALUES ($1, $2, $3) RETURNING id, nome, email, year",
      [nome, email, parseInt(year)]
    );
    res.status(201).json({
      message: "User criado com sucesso",
      user: {
        id: result.rows[0].id,
        nome: result.rows[0].nome,
        email: result.rows[0].email,
        year: result.rows[0].year
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               year:
 *                 type: integer
 *             required:
 *               - nome
 *               - email
 *               - year
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       404:
 *         description: User not found
 */
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, email, year } = req.body;

  try {
    const result = await pool.query(
      "UPDATE users SET nome = $1, email = $2, year = $3 WHERE id = $4 RETURNING id, nome, email, year",
      [nome, email, year, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "User não encontrado" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const userResult = await pool.query("SELECT nome FROM users WHERE id = $1", [id]);
    if (userResult.rowCount === 0) {
      return res.status(404).json({ error: "User não encontrado" });
    }

    await pool.query("DELETE FROM users WHERE id = $1", [id]);

    res.status(200).json({
      message: `Usuário com ID ${id} e nome ${userResult.rows[0].nome} foi apagado com sucesso`
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Servidor a iniciar na porta ${port}`);
});
