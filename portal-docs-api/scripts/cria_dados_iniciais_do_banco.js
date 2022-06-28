const { encryptSHA256 } = require("../auth");
const { Users } = require("../models");

Users.create({
  nome: "Jonas",
  sobrenome: "P. Geremias",
  email: "jonasgeremias@hotmail.com",
  email_recuperacao: "jonasgeremias@hotmail.com",
  estado: "SC",
  telefone: "48999999999",
  cpf: "99999999999",
  password: encryptSHA256("123456"),
  type: "admin",
});
