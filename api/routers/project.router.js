const projectRouter = require("express").Router();
const { getProjectByNumber, delProjectByNumber } = require("../controllers/project.controller");


projectRouter.route("/:project_number").get(getProjectByNumber).delete(delProjectByNumber);

module.exports = projectRouter; 