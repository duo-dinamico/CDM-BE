const apiRouter = require("express").Router();
const projectsRouter = require("./projects.router");
const projectRouter = require("./project.router");
const { getAPIJSON } = require("../controllers/api.controller");

apiRouter.route("/").get(getAPIJSON);
apiRouter.use("/projects", projectsRouter);
apiRouter.use("/project", projectRouter);

module.exports = apiRouter;
