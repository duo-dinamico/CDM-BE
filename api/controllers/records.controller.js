const { fetchAllRecords } = require("../models/records.model");

exports.getAllRecords = (req, res, next) => {
  fetchAllRecords(req.params).then((records) => {
    console.log(records)
    res.status(200).send({ records });
  });
};
