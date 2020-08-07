const proffys = [
  {
    name: "Diego Fernandes",
    avatar:
      "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
    whatsapp: "123456",
    bio:
      "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
    subject: "Química",
    cost: "20,00",
    weekday: [0],
    time_from: [720],
    time_to: [1220],
  },
];
const subjects = [
  "Artes",
  "Biologia",
  "Ciências",
  "Educação física",
  "Física",
  "Geografia",
  "Historia",
  "Matematizar",
  "Português",
  "Química",
];
const weekdays = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

function getSubjects(subjectNumber) {
  const index = +subjectNumber - 1;
  return subjects[index];
}

function pageLanding(req, res) {
  return res.render("index.html");
}
function pageStudy(req, res) {
  const filters = req.query;
  return res.render("study.html", {
    proffys,
    subjects,
    weekdays,
    filters,
  });
}

function pageGiveClasses(req, res) {
  const data = req.query;

  const isNotEmpty = Object.keys(data).length !== 0;

  //Se o data nao estiver vazio
  if (isNotEmpty) {
    data.subject = getSubjects(data.subject);
    //adicione o novo proffy ao array
    proffys.push(data);
    //e retorne pra pagina study
    return res.redirect("/study");
  }
  //se nao, volte para give-classes
  return res.render("give-classes.html", {
    subjects,
    weekdays,
  });
}

//configuração do servidor
const express = require("express");
const server = express();

//configuração do template engine
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

//Arquivos públicos
server.use(express.static("public"));

//Routas
server.get("/", pageLanding);
server.get("/study", pageStudy);
server.get("/give-classes", pageGiveClasses);
//Porta
server.listen(3000);
