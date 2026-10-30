# Sistema Web com Node.js, PostgreSQL e Docker

Projeto desenvolvido para a disciplina de Engenharia de Software, com o objetivo de criar uma aplicação web moderna, utilizando boas práticas de desenvolvimento, conteinerização e persistência de dados.

## Tecnologias Utilizadas

O projeto foi construído utilizando uma stack robusta e amplamente utilizada no mercado:
- **Node.js & Express:** Framework rápido e minimalista para construção da API e rotas do servidor.
- **PostgreSQL (v15):** Banco de dados relacional robusto para armazenamento seguro das informações.
- **Docker & Docker Compose:** Ferramentas de conteinerização para garantir que o ambiente rode de forma idêntica em qualquer máquina (Desenvolvimento/Produção).
- **dotenv:** Gerenciamento seguro de variáveis de ambiente.

---

## Arquitetura do Projeto

A aplicação está dividida em microsserviços gerenciados pelo Docker Compose:
1. **Serviço `api`:** Contém a aplicação Node.js rodando em um container Alpine leve.
2. **Serviço `db`:** Contém o banco de dados PostgreSQL com persistência de dados em **Docker Volumes** (os dados não são perdidos ao reiniciar os containers).

---

## Como Executar o Projeto

Para rodar este projeto na sua máquina, você só precisa ter o **Git** e o **Docker Desktop** instalados.

### 1. Clonar o repositório
```bash
git clone https://github.com/andersons9601/AmbienteWeb.git
cd AmbienteWeb

2. Configurar as variáveis de ambiente
Crie um arquivo .env na raiz do projeto (baseando-se no .env.example) com as seguintes credenciais:


3. Subir a aplicação com Docker
Execute o comando abaixo para construir a imagem e iniciar os containers em segundo plano:


4. Criar a tabela no Banco de Dados
Com os containers rodando, acesse o terminal e crie a tabela inicial de usuários executando:


Rotas Disponíveis
Após subir o projeto, acesse no navegador ou via cliente HTTP (como Postman/Thunder Client):

GET / → Mensagem de boas-vindas / Página inicial.
GET /db → Testa a conexão com o PostgreSQL e retorna o horário do banco.
GET /usuarios → Lista todos os usuários cadastrados.
POST /usuarios → Cadastra um novo usuário (envie nome e email no body).

Autor
Desenvolvido por José Anderson da Silva para prática de Engenharia de Software.