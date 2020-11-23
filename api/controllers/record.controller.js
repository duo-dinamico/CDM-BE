const { fetchRecordById, deleteRecordById } = require("../models/record.model.js");

exports.getRecordById = (req, res, next) => {
    fetchRecordById(req.params)
      .then((record) => {
        res.status(200).send({ record });
      })
      .catch((err) => {
        next(err);
      });
  };

exports.delRecordById = (req, res, next) => {
  deleteRecordById(req.params)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        next(err);
      });
  };