# api-portal-controle-de-documentos
Back-End da ABP referente a disciplina de Tópicos Especiais.

## Rotas Da aplicação

### Rota Autenticação:

* api/auth/signin
* api/auth/signup
* api/auth/signout

### CRUD Usuários:

* api/users (list: GET)
* api/users (add: POST)
* api/users/:id (show: GET)
* api/users/:id (alterar: PUT)
* api/users/:id (delete: DELETE)

### CRUD Clientes: "OK"

* api/clients/ (list: GET)
* api/clients/ (add: POST)
* api/clients/:id (show: GET)
* api/clients/:id (alterar: PUT)
* api/clients/:id (delete: DELETE)

### CRUD Documentos:

* api/documents/ (list: GET)
* api/documents/ (add: POST)
* api/documents/:id (show: GET)
* api/documents/:id (alterar: PUT)
* api/documents/:id (delete: DELETE)

### Enviar emails:
* api/email/send/:id (POST)

## Dependências do projeto 

* Como ja foi adicionado no arquivo package.json, basta rodar o comando `npm install`, mas segue abaixo as dependências:

```
npm install --save express
npm install --save sequelize
npm install --save mysql2
npm install --save multer
npm install --save-dev sequelize-cli
npm install --save-dev nodemon
npm install --save nodemailer
```

* Depois rodar o comando `npm start`, que também foi configurado no package.json.
* Depois acessar a rota `http://localhost:5000/` pelo navegador e ver o `{"ok": true}`.

### Sequelize para criação do banco de dados e models da aplicação:

* Rodar o comando `npx sequelize-cli init `.
* Alterar o `config/config.json` com o exemplo:
```
  {
  "development": {
    "username": "root",
    "password": "",
    "database": "abp_topicos_especiais_satc_dev",
    "host": "127.0.0.1",
    "dialect": "mysql"
 },  
  "production": {
    "username": "root",
    "password": null,
    "database": "abp_topicos_especiais_satc",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

### Comandos Sequelize para criar as tabelas:

* Criar a tabela manualmente.

* Users:
`npx sequelize-cli model:generate --name Users --attributes nome:string,sobrenome:string,password:string,telefone:string,cpf:string,endereco:string,bairro:string,cidade:string,estado:string,email:string,email_recuperacao:string,token:string`

* Clientes:
`npx sequelize-cli model:generate --name Clients --attributes razao_social:string,nome_fantasia:string,inscricao_estadual:string,inscricao_municipal:string,cnpj:string,endereco:string,bairro:string,cidade:string,estado:string,cep:string,telefone:string,email:string`

* Documents:
`npx sequelize-cli model:generate --name Documents --attributes nome:string,descricao:string,client_id:integer, data_validade:string,categoria:string,filename:string,path:string, file_size:integer`

* Emails: @pending adicionar atributos:
`npx sequelize-cli model:generate --name Emails --attributes client_id:integer,title:string,message:string,email:string,status:string,data_envio:string`


* Comando para gerar: `npx sequelize-cli db:migrate`

### Rodando os scripts iniciais
 * rodar o script `node scripts\cria_dados_iniciais_do_banco.js`

## Comandos mais usados GIT:
* `git status`
* `git add .`
* `git commit -m "texto com a alteraçãodo commit"`
* `git push origin nome-branch`

### branch ofcial: main 

## Autores

* Jonas P. Geremias

* Jonatas F. Grassi

* Higor R.Librelato