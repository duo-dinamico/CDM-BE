const registerRouter = require("express").Router();
const { errors405s } = require("../errors/");
const { getAllRisks } = require("../controllers/project.controller");

registerRouter.route("/").get(getAllRisks);

module.exports = registerRouter;
