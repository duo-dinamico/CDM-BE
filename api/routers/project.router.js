const projectRouter = require("express").Router();
const { getProjectByNumber } = require("../controllers/project.controller");

projectRouter.route("/:project_number").get(getProjectByNumber);

module.exports = projectRouter; 