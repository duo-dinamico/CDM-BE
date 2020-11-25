const projectRouter = require("express").Router();
const { errors405s } = require("../errors/");
const {
  getProjectByNumber,
  delProjectByNumber,
  postProjectByNumber,
  patchProjectByNumber,
  getRecordByProject,
  getOneRecordByProject,
  delOneRecord,
  getAllRisks,
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
projectRouter
  .route("/:project_number/records")
  .get(getRecordByProject)
  .all(errors405s);

projectRouter
  .route("/:project_number/record/:version")
  .get(getOneRecordByProject)
  .delete(delOneRecord)
  .all(errors405s);

projectRouter.route("/:project_number/register").get(getAllRisks);

module.exports = projectRouter;
