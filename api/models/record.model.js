const connection = require("../../db/connection");

exports.fetchRecordById = (params) => {

  // Check if record_id is a number
  if (isNaN(params.record_id)) {
    return Promise.reject({ status: 400, msg: "Record ID need to be a number" });
  }

  return connection("record_issues")
    .where("record_id", params.record_id)
    .then((response) => {
      console.log(response);
      if (response.length < 1) {
        return Promise.reject({ status: 400, msg: "Record not found" });
      } else {
        return response;
      }
  });
}

exports.deleteRecordById = (params) => {
  
  // Check if record_id is a number
  if (isNaN(params.record_id)) {
    return Promise.reject({ status: 400, msg: "Record ID need to be a number" });
  }
  
  return connection("record_issues")
    .where("record_id", params.record_id)
    .then((response) => {
      if (response.length < 1) {
        return Promise.reject({ status: 400, msg: "Record not found" });
      } else {
        return connection("record_issues")
          .where("record_id", params.record_id)
          .del();
      }
  });
};