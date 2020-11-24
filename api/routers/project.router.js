const projectRouter = require("express").Router();
const { errors405s } = require("../errors/");
const {
  getProjectByNumber,
  delProjectByNumber,
  postProjectByNumber,
  patchProjectByNumber,
  getRecordByProject,
} = require("../controllers/project.controller");
const registerRouter = require("./register.router");

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
projectRouter
  .route("/:project_number/records")
  .get(getRecordByProject)
  .all(errors405s);
projectRouter.use("/:project_number/register", registerRouter);

module.exports = projectRouter;
