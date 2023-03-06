#  Projeto realizado para Desafio Tech do programa de trainees do Biopark de 2023

## Conteúdo
* [Sobre a aplicação](#sobre-a-aplicação)
* [Tecnologias](#hammer_and_wrench-tecnologias)
* [Iniciando a Aplicação](#car-Iniciando-a-aplicação)
* [Licença](#balance_scale-licença)

## Sobre a aplicação
Aplicação web de um sistema para gestão dos apartamentos entregues no ecossistema do Biopark.
<br />
1. __Back-end__: Desenvolvido em Node.JS com Typescript, utilizando Prisma com banco de dados PostgreSQL.
2. __Front-end__: Permite listar e cadastrar: edifícios, apartamentos, locatários, locadores e aluguéis. Desenvolvido em React com Next, Typescript e SASS.

## :hammer_and_wrench: Tecnologias
* Back-end
  * __Node.js__ com Typescript
  * __Prisma ORM__ para acessar o banco de dados
  * Autenticação __JWT__
  * __Multer__ para upload de imagens
* Front-end
  * __React__ com __Next__ e Typescript
  * __Nookies__ para armazenar cookies
  * __SASS__ para estilização

## :car: Iniciando a aplicação
Baixe o repositório com git clone e entre na pasta do projeto.
```bash
$ git clone https://github.com/endrylmoraes/desafio-tech-Biopark2023.git
```
### __Banco de dados__
Será usado o Prisma CLI para gerar o banco de dados. Caso ainda não o tenha instalado, você pode instalá-lo usando o comando
```bash
$ npm install -g prisma 
ou 
```bash
$ yarn global add prisma

### __Back-end__
Na raíz da pasta backend, crie um arquivo chamado .env (vide exemplo no arquivo .env.example)<br/>
Informe a URL do banco de dados na variável __DATABASE_URL__.<br/>
Informe a palavra secreta na variável __JWT_SECRET__<br/>
```bash
# Instale as dependências
$ yarn

```bash
# Gere o banco de dados
$ yarn prisma migrate dev

# Para iniciar a aplicação na porta 3333
$ yarn dev
```
### __Front-end__
  Na pasta web, informe o IP da aplicação back-end no arquivo _src/services/api.ts_<br/>
```bash
# Instale as dependências
$ yarn

# Para iniciar a aplicação na porta 3000
$ yarn dev
```

## :balance_scale: Licença
Este projeto está licenciado sob a [licença GNU](LICENSE).