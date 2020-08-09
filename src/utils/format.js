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

function convertHoursToMinutes(time) {
  const [hour, minutes] = time.split(":");
  return Number(hour * 60 + Number(minutes));
}

module.exports = { subjects, weekdays, getSubjects, convertHoursToMinutes };
