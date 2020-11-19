const express = require("express");
const app = express();
const cors = require("cors");
const apiRouter = require("./api/routers/api.router");
const { customError, catchAll, PSQLerrors } = require("./api/errors");

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);
app.use(PSQLerrors);
app.use(customError);
app.use(catchAll);

app.all("*", (req, res, next) => {
  res.status(400).send({ msg: "Path does not exist." });
});

module.exports = { app };
