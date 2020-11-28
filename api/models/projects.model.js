const connection = require("../../db/connection");

exports.fetchAllProjects = () => {
  const filterKeys = Object.keys(filters);
  console.log(filters);
  return connection("projects")
    .select()
    .modify((query) => {
      if (filterKeys.length > 1) {
        query.where(filters);
      }
    })
    .then((response) => {
      return response;
    });
};
