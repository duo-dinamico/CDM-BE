const projectsRouter = require("express").Router();
const { errors405s } = require("../errors/");
const { getAllProjects } = require("../controllers/projects.controller");

projectsRouter.route("/").get(getAllProjects).all(errors405s);

module.exports = projectsRouter;
