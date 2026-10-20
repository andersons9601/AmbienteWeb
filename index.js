const http = require('http');
const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

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


// Rota principal (mensagem de boas-vindas)
app.get('/', (req, res) => {
    res.send('API do AmbienteWeb rodando com sucesso!');
});

// Rota para testar a conexão com o banco de dados
app.get('/db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({
            mensagem: 'Conectado ao PostgreSQL com sucesso!',
            horarioBanco: result.rows[0].now
        });
    } catch (err) {
        res.status(500).send('Erro na conexão com o banco: ' + err.message);
    }
});

// Inicialização do servidor utilizando o Express
const PORT = 3000;
app.listen(PORT, () => {
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

app.put('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params; // Pega o ID passado na URL
        const { nome, email } = req.body; // Pega os novos dados do corpo da requisição

        const resultado = await pool.query(
            'UPDATE usuarios SET nome = $1, email = $2 WHERE id = $3 RETURNING *',
            [nome, email, id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }

        res.json(resultado.rows[0]);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao atualizar usuário' });
    }
});

app.delete('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;  

        const resultado = await pool.query(
            'DELETE FROM usuarios WHERE id = $1 RETURNING *',
            [id]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }

        res.json({ mensagem: 'Usuário deletado com sucesso!' });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao deletar usuário' });
    }
});