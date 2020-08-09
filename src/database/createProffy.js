module.exports = async function (
  db,
  { proffyValue, classValue, classScheduleValues }
) {
  // Inserir dados na tabela proffys
  const insertedProffy = await db.run(`
    INSERT INTO proffys (
      name,
      avatar,
      whatsapp,
      bio
    ) VALUES (
      "${proffyValue.name}",
      "${proffyValue.avatar}",
      "${proffyValue.whatsapp}",
      "${proffyValue.bio}"
    );
  `);
  const proffy_id = insertedProffy.lastID;

  // Inserir dados na tabela classes
  const insertedClass = await db.run(`
      INSERT INTO classes (
        subject,
        cost,
        proffy_id
      ) VALUES (  
        "${classValue.subject}",
        "${classValue.cost}",
        "${proffy_id}"
      );
  `);
  const class_id = insertedClass.lastID;

  // Inserir dados na tabela de horários
  const insertedAllClassesScheduleValues = classScheduleValues.map(
    (schedule) => {
      return db.run(`
      INSERT INTO class_schedule (
        class_id,
        weekday,
        time_from,
        time_to
      ) VALUES (
        "${class_id}",
        "${schedule.weekday}",
        "${schedule.time_from}",
        "${schedule.time_to}"
      );
    `);
    }
  );

  // Aqui vou executar todos os db.runs das class_schedule
  await Promise.all(insertedAllClassesScheduleValues);
};
