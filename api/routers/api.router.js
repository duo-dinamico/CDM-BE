const apiRouter = require("express").Router();
const projectsRouter = require("./projects.router");
const projectRouter = require("./project.router");
const { getAPIJSON } = require("../controllers/api.controller");
const { errors405s } = require("../errors/");

apiRouter.route("/").get(getAPIJSON).all(errors405s);
apiRouter.use("/projects", projectsRouter);
apiRouter.use("/project", projectRouter);

module.exports = apiRouter;
