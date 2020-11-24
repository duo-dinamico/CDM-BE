const recordRouter = require("express").Router();
const { errors405s } = require("../errors/");

const { 
  getRecordById,
  delRecordById,
  postRecord
} = require("../controllers/record.controller");

recordRouter
  .route("/")
  .post(postRecord)
  // .patch(patchRecord)
  .all(errors405s);

recordRouter
  .route("/:record_id")
  .get(getRecordById)
  .delete(delRecordById)
  .all(errors405s);

module.exports = recordRouter;