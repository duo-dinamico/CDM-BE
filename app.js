const express = require("express");
const app = express();
const cors = require("cors");
const apiRouter = require("./api/routers/api.router");

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

module.exports = { app };
