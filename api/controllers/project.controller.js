const { fetchProjectByNumber, deleteProjectByNumber } = require("../models/project.model");

exports.getProjectByNumber = (req, res, next) => {
  const {project_number} = req.params;
  fetchProjectByNumber({project_number}).then((project) => {
    res.status(200).send({project});
  });
};

exports.delProjectByNumber = (req, res, next) => {
  const {project_number} = req.params;
  deleteProjectByNumber({project_number}).then(() => {
    res.status(200).send("Project deleted");
  });
};