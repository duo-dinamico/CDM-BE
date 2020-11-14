const projectsRouter = require("express").Router();
const { getAllProjects } = require("../controllers/projects.controller");

projectsRouter.route("/").get(getAllProjects);

module.exports = projectsRouter;
