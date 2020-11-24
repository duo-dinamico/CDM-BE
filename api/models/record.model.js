const connection = require("../../db/connection");

exports.fetchRecordById = (params) => {

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

        // Record don't exist
        return Promise.reject({ status: 400, msg: "Record not found" });
      } else {

        // Record exist, let's delete it
        return connection("record_issues")
          .where("record_id", params.record_id)
          .del();
      }
  });
};

exports.createRecord = (body) => {

  // Check if project_number exist
  return connection("projects")
    .where("project_number", body.project_number)
    .then((rec) => {
      if (rec.length < 1) {
        
        // Project don't exist
        return Promise.reject({ status: 400, msg: "Project number don't exist" });
      } else {
        
        // Project exist, let's insert the record
        return connection("record_issues")
          .insert(body, [
            "record_id",
            "project_number",
            "version_number",
            "stage_issued",
            "purpose",
            "date",
            "prepared",
            "checked",
            "approved",
            "remarks"
          ]);
      }
  });
};
