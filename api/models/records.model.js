const connection = require("../../db/connection");

exports.fetchAllRecords = (params) => {
  return connection("record_issues")
    .where("project_number", params.project_number);
};
