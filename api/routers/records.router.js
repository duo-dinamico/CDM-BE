const recordsRouter = require("express").Router();
const { errors405s } = require("../errors");
const { getAllRecords } = require("../controllers/records.controller");

recordsRouter.route("/:project_number")
    .get(getAllRecords)
    .all(errors405s);

module.exports = recordsRouter;
