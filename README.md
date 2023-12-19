# Users API

API feita em um vídeo postado no meu canal no YouTube. Para acessá-lo, [clique aqui](https://youtu.be/gU3kp7Aw0JI).

## Tecnologias utilizadas

- Node.js
- TypeScript
- Express
- MongoDB

## Conceitos utilizados

- SOLID
- Injeção de Dependência (Dependency Injection)
- Repository Pattern

## Entidades

<pre>
User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}</pre>

## Rotas

- GET /users - retorna os usuários salvos no banco
- POST /users - cria um usuário
- PATCH /users/:id - atualiza um usuário
- DELETE /users/:id - deleta um usuário


## Instalação
```sh
# Faça o clone do repotório

# Instalar as dependências do projeto
  yarn add  install

# Executando o projeto no ambiente de desenvolvimento
  yarn start:dev
```

# Subindo o banco de dados com docker
docker compose up -d

# Remove todos os contêineres e seus componentes
docker-compose down
```
# Node.js Versão
v16.20.1.

## Arquitetura

![Arquitetura](https://imgur.com/k5mXFoZ.png)