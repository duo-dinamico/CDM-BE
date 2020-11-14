const {
  projectsData,
  recordData,
  registerData,
  recordRegisterData,
} = require("../data");

exports.seed = function (knex) {
  return knex.migrate
    .rollback()
    .then(() => {
      return knex.migrate.latest();
    })
    .then(() => {
      const projectsInsertion = knex("projects").insert(projectsData);
      const recordInsertion = knex("record_issues").insert(recordData);
      const registerInsertion = knex("register").insert(registerData);
      const recordRegisterInsertion = knex("record_register").insert(
        recordRegisterData
      );

      return Promise.all([
        projectsInsertion,
        recordInsertion,
        registerInsertion,
        recordRegisterInsertion,
      ]);
    });
};
