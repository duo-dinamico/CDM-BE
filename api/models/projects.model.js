const connection = require("../../db/connection");

exports.fetchAllProjects = (filters) => {
  const filterKeys = Object.keys(filters);
  return connection("projects")
    .select()
    .modify((query) => {
      if (filterKeys.length > 0) {
        query.where(filters);
      }
    });
};
