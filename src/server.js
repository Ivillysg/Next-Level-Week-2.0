//configuração do servidor
const express = require("express");
const server = express();

//configuração do template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

//receber os dados do req.body
server.use(express.urlencoded({ extended: true }));
//Arquivos públicos
server.use(express.static("public"));

//Pages
const {
  pageLanding,
  pageStudy,
  pageGiveClasses,
  saveClasses,
} = require("./page");

//Routas
server.get("/", pageLanding);
server.get("/study", pageStudy);
server.get("/give-classes", pageGiveClasses);
server.post("/save-classes", saveClasses);

//Porta
server.listen(3000);
