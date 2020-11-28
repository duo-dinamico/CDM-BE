const connection = require("../../db/connection");

exports.fetchAllRecords = (req) => {
  return connection("record_issues")
    .where(req.params)
    .modify((query) => {
      if (Object.keys(req.query).length > 0) {
        query.where(req.query);
      }
    });
};
