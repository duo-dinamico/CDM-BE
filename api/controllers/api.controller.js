const { fetchApiJson } = require("../models/api.model");

exports.getAPIJSON = (req, res, next) => {
  fetchApiJson((err, apiJSON) => {
    if (err) next(err);
    res.status(200).send(JSON.parse(apiJSON));
  });
};
