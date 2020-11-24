const connection = require("../../db/connection");

exports.fetchProjectByNumber = (project_number) => {
  return connection("projects")
    .where("project_number", project_number["project_number"])
    .then((response) => {
      if (response.length < 1) {
        return Promise.reject({ status: 400, msg: "Project not found" });
      } else {
        return response;
      }
    });
};

exports.deleteProjectByNumber = (project_number) => {
  return connection("projects")
    .where("project_number", project_number["project_number"])
    .then((response) => {
      if (response.length < 1) {
        return Promise.reject({ status: 400, msg: "Project not found" });
      } else {
        return connection("projects")
          .where("project_number", project_number["project_number"])
          .del();
      }
    });
};

exports.createProjectByNumber = ({
  project_number,
  project_title,
  project_lead_office,
  client,
  stage,
}) => {
  return connection("projects").insert(
    {
      project_number,
      project_title,
      project_lead_office,
      client,
      stage,
    },
    [
      "project_number",
      "project_title",
      "project_lead_office",
      "client",
      "stage",
    ]
  );
};

exports.editProjectByNumber = ({
  project_number,
  project_title,
  project_lead_office,
  client,
  stage,
}) => {
  if (project_number === undefined) {
    return Promise.reject({ status: 400, msg: "Project number missing." });
  } else {
    return connection("projects")
      .where("project_number", project_number)
      .update(
        {
          project_number,
          project_title,
          project_lead_office,
          client,
          stage,
        },
        [
          "project_number",
          "project_title",
          "project_lead_office",
          "client",
          "stage",
        ]
      )
      .then((response) => {
        if (response.length < 1) {
          return Promise.reject({
            status: 400,
            msg: "Project not found.",
          });
        } else {
          return response;
        }
      });
  }
};

exports.fetchRecordByProject = (project_number) => {
  return connection("record_issues")
    .where("project_number", project_number["project_number"])
    .then((response) => {
      if (response.length < 1) {
        return Promise.reject({ status: 400, msg: "Project not found" });
      } else {
        return response;
      }
    });
};

exports.fetchRecordByRecordId = (params) => {
  return connection("record_issues")
    .where("project_number", params.project_number)
    .where("record_id", params.record_id)
    .then((response) => {
      if (response.length < 1) {
        return Promise.reject({ status: 400, msg: "Project not found" });
      } else {
        return response;
      }
    });
};

exports.fetchAllRisks = () => {
  return connection("register").select();
};
