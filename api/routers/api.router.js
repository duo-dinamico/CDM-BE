const apiRouter = require("express").Router();
const projectsRouter = require("./projects.router");
const { getAPIJSON } = require("../controllers/api.controller");

apiRouter.route("/").get(getAPIJSON);
apiRouter.use("/projects", projectsRouter);

module.exports = apiRouter;
