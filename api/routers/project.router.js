const projectRouter = require("express").Router();
const { errors405s } = require("../errors/");
const {
  getProjectByNumber,
  delProjectByNumber,
  postProjectByNumber,
  patchProjectByNumber,
} = require("../controllers/project.controller");

projectRouter
  .route("/")
  .post(postProjectByNumber)
  .patch(patchProjectByNumber)
  .all(errors405s);
projectRouter
  .route("/:project_number")
  .get(getProjectByNumber)
  .delete(delProjectByNumber)
  .all(errors405s);

module.exports = projectRouter;
