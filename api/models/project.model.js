const connection = require("../../db/connection");

exports.fetchProjectByNumber = (project_number) => {
  return connection("projects").where(
    "project_number",
    project_number["project_number"]
  );
};

exports.deleteProjectByNumber = (project_number) => {
  return connection("projects")
    .where("project_number", project_number["project_number"])
    .del().then(() => {
      return "Project deleted";
    });
};