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
  postOneRecord,
  patchOneRecord,
  getAllRisks,
  getOneRisk,
  patchOneRisk,
  postOneRisk,
  delOneRisk,
} = require("../controllers/project.controller");

projectRouter.route("/").post(postProjectByNumber).all(errors405s);
projectRouter
  .route("/:project_number")
  .get(getProjectByNumber)
  .delete(delProjectByNumber)
  .patch(patchProjectByNumber)
  .all(errors405s);
projectRouter
  .route("/:project_number/records")
  .get(getRecordByProject)
  .post(postOneRecord)
  .all(errors405s);
projectRouter
  .route("/:project_number/register")
  .get(getAllRisks)
  .post(postOneRisk)
  .all(errors405s);
projectRouter
  .route("/:project_number/register/:register_id")
  .get(getOneRisk)
  .patch(patchOneRisk)
  .delete(delOneRisk)
  .all(errors405s);
projectRouter
  .route("/:project_number/record/:version")
  .get(getOneRecordByProject)
  .delete(delOneRecord)
  .patch(patchOneRecord)
  .all(errors405s);

projectRouter.route("/:project_number/register").get(getAllRisks);

module.exports = projectRouter;
