<div align="center">
  
 ## Projeto Abacus
  
</div>

## 📁 Informações do projeto:
### Banco de Dados:
- Projeto desenvolvido utilizando MongoDB, um banco de dados não relacional orientado a documentos. As credenciais de acesso(e-mail e senha)
ao banco serão passadas em um arquivo a parte. O acesso é bem simples, basta seguir o passo a passo:
1. Acessar o link : `https://www.mongodb.com`
2. Realizar o login utilizando a conta google: gualtertek@gmail.com e a senha: (enviada em um documento a parte)
3. Na tela que se abre (Database), selecione a opção `Browse Collections`
4. Nessa opção estarão contidas as Coleções de Dados com os documentos (ProdutoModel e CategoriaModel)


## 📁 Utilização do projeto:
### Requisitos:

Instalaçao: `git`, `node`, `postman`.
Ter uma conta no `MongoDB Atlas`.
<br>
(Caso queira ver os dados no banco vou enviar junto a prova o e-mail e senha para acessar)
<hr>

### 📥 Instalação de BackEnd
1. `cd TekProva/backend`
2. `npm i`
3. `npm install nodemon` 
4. Comando para inicialização:
```
npm run dev
```
Obs: As credenciais do `.env` subirei para o repostorio apenas para facilitar a correção, sei que não deve ser enviadas em situações normais.
<hr>

### 📥 Instalação de FrontEnd
1. `cd TekProva/frontend`
2. `npm i`
3. Comando para incialização: 
```
npm run serve
```
4.Acessar http://localhost:8080/ para visualizar o projeto.

<hr>

## ⚙️ Bibliotecas e dependências utilizadas no BackEnd:

- `express`
- `mongoose`
- `cors`
- `morgan` 
- `dotenv`
- `nodemon` (normlamente instalada como dependência dedesenvolvimento, mas para facilitar, está como dependencia principal do projeto)

<hr>

## ⚙️ Bibliotecas e dependências utilizadas no Frontend:

- `vue-jwt-decode`
- `axios`
- `sweetalert`
- `@vue/cli`
- `vuetify`
<hr>







