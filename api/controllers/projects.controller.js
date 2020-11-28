const { fetchAllProjects } = require("../models/projects.model");

exports.getAllProjects = (req, res, next) => {
  const filters = req.query;
  fetchAllProjects(filters)
    .then((projects) => {
      res.status(200).send({ projects });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
