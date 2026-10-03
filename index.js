const http = require('http');
const { Pool } = require('pg');

// Configuração do pool de conexões
const pool = new Pool({
    host: 'db', // Nome do serviço do PostgreSQL no docker-compose.yml
    user: 'postgres',
    password: 'senha_segura',
    database: 'meu_banco',
    port: 5432,
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