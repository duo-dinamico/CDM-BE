const { fetchAllProjects } = require("../models/projects.model");

exports.getAllProjects = (req, res, next) => {
  fetchAllProjects(req.query)
    .then((projects) => {
      res.status(200).send({ projects });
    })
    .catch((err) => {
      next(err);
    });
};
