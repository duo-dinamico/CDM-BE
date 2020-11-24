const { 
  fetchRecordById,
  deleteRecordById,
  createRecord
} = require("../models/record.model.js");

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

exports.postRecord = (req, res, next) => {
  createRecord(req.body)
    .then((newRecord) => {
      res.status(201).send({ record: newRecord[0] });
    })
    .catch((err) => {
      next(err);
    });
};
