const recordRouter = require("express").Router();
const { errors405s } = require("../errors/");

const { 
  getRecordById,
  delRecordById
} = require("../controllers/record.controller");

recordRouter
  .route("/:record_id")
  .get(getRecordById)
  .delete(delRecordById)
  .all(errors405s);

module.exports = recordRouter;