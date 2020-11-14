const connection = require("../../db/connection");

exports.fetchAllProjects = () => {
  return connection("projects").select();
};
