const request = require('supertest');
// Nota: Para testar o app, precisamos exportar o app no index.js ou criar uma instância dele.
// Vamos simular uma chamada básica na API para ver se ela responde.

describe('Testes da API - AmbienteWeb', () => {
    
    it('Deve retornar mensagem de sucesso na rota principal (GET /)', async () => {
        // Se a sua rota principal renderiza EJS ou retorna texto, 
        // vamos testar a rota /db ou /usuarios que retorna JSON, que é mais fácil para testes automatizados.
        const response = await request('http://localhost:3000').get('/db');
        
        // Esperamos que o status HTTP seja 200 (Sucesso)
        expect(response.status).toBe(200);
        // Esperamos que a mensagem venha correta
        expect(response.body).toHaveProperty('mensagem');
    });

    it('Deve listar os usuários (GET /usuarios)', async () => {
        const response = await request('http://localhost:3000').get('/usuarios');
        
        // Esperamos status 200 e que o retorno seja um array
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

}); 