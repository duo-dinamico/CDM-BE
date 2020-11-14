const { fetchAllProjects } = require("../models/projects.model");

exports.getAllProjects = (req, res, next) => {
  fetchAllProjects().then((projects) => {
    res.status(200).send({ projects });
  });
};
