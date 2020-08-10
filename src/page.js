const {
  subjects,
  weekdays,
  getSubjects,
  convertHoursToMinutes,
} = require("./utils/format");

const Database = require("./database/db");

function pageLanding(req, res) {
  return res.render("index.html");
}
async function pageStudy(req, res) {
  const filters = req.query;
  //Se n existe filters
  if (!filters.subject || !filters.weekday || !filters.time) {
    //Então listar todos os proffys cadastrados
    const querySelectedAll = `
    SELECT classes.*, proffys.* 
    FROM proffys
    JOIN classes ON (classes.proffy_id = proffys.id)
    WHERE classes.proffy_id = proffys.id;
  `;

    try {
      const db = await Database;
      const proffys = await db.all(querySelectedAll);

      proffys.map((proffy) => {
        proffy.subject = getSubjects(proffy.subject);
      });

      return res.render("study.html", { proffys, subjects, filters, weekdays });
    } catch (error) {
      console.log(error);
    }
  }

  //Se nao, filtrar
  const timeToMinutes = convertHoursToMinutes(filters.time);

  const querySelectedFilter = `
  SELECT classes.*, proffys.*
  FROM proffys
  JOIN classes ON (classes.proffy_id = proffys.id)
  WHERE EXISTS (
    SELECT class_schedule.*
    FROM class_schedule
    WHERE class_schedule.class_id = classes.id
    AND class_schedule.weekday = "${filters.weekday}"
    AND class_schedule.time_from <= ${timeToMinutes}
    AND class_schedule.time_to > ${timeToMinutes}
  )
  AND classes.subject = '${filters.subject}';
  `;

  try {
    const db = await Database;
    const proffys = await db.all(querySelectedFilter);

    proffys.map((proffy) => {
      proffy.subject = getSubjects(proffy.subject);
    });

    return res.render("study.html", { proffys, subjects, filters, weekdays });
  } catch (error) {
    console.log(error);
  }
}

function pageGiveClasses(req, res) {
  return res.render("give-classes.html", {
    subjects,
    weekdays,
  });
}

async function saveClasses(req, res) {
  const createProffy = require("./database/createProffy");
  const { name, avatar, whatsapp, bio, subject, cost } = req.body;

  const proffyValue = {
    name,
    avatar,
    whatsapp,
    bio,
  };

  const classValue = {
    subject,
    cost,
  };

  const classScheduleValues = req.body.weekday.map((weekday, index) => {
    return {
      weekday,
      time_from: convertHoursToMinutes(req.body.time_from[index]),
      time_to: convertHoursToMinutes(req.body.time_to[index]),
    };
  });

  try {
    const db = await Database;
    await createProffy(db, { proffyValue, classValue, classScheduleValues });

    return res.redirect("/result");
  } catch (error) {
    console.log(error);
  }
}
function pageResult(req, res) {
  return res.render("result.html");
}

module.exports = {
  pageLanding,
  pageStudy,
  pageGiveClasses,
  saveClasses,
  pageResult,
};
