const connection = require("../../db/connection");

exports.fetchProjectByNumber = (project_number) => {
  return connection("projects").where("project_number", project_number["project_number"]);
};