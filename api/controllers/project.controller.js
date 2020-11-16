const { fetchProjectByNumber } = require("../models/project.model");

exports.getProjectByNumber = (req, res, next) => {
  const {project_number} = req.params;
  fetchProjectByNumber({project_number}).then((project) => {
    res.status(200).send({project});
  });
};