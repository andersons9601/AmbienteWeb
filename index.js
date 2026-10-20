const http = require('http');
const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

// Configuração do pool de conexões
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

const server = http.createServer(async (req, res) => {
    if (req.url === '/db') {
        try {
            // Consulta a hora atual do servidor PostgreSQL
            const result = await pool.query('SELECT NOW()');
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                mensagem: 'Conectado ao PostgreSQL com sucesso!',
                horarioBanco: result.rows[0].now
            }));
        } catch (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Erro na conexão com o banco: ' + err.message);
        }
    } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('API do AmbienteWeb rodando com sucesso!');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

app.get('/usuarios', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM usuarios');
        res.json(resultado.rows);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro no servidor ao buscar usuários' });
    }
});

app.post('/usuarios', async (req, res) => {
  try {
    const { nome, email } = req.body;
    const resultado = await pool.query(
      'INSERT INTO usuarios (nome, email) VALUES ($1, $2) RETURNING *',
      [nome, email]
    );
    res.status(201).json(resultado.rows[0]);
  } catch (erro) {
    console.error(erro);
    res.status(500).json({ erro: 'Erro ao cadastrar usuário' });
  }
});