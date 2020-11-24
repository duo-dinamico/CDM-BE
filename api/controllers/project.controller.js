const {
  fetchProjectByNumber,
  deleteProjectByNumber,
  createProjectByNumber,
  editProjectByNumber,
  fetchRecordByProject,
  fetchRecordByRecordNumber,
  fetchAllRisks,
} = require("../models/project.model");

exports.getProjectByNumber = (req, res, next) => {
  const { project_number } = req.params;
  fetchProjectByNumber({ project_number })
    .then((project) => {
      res.status(200).send({ project });
    })
    .catch((err) => {
      next(err);
    });
};

exports.delProjectByNumber = (req, res, next) => {
  const { project_number } = req.params;
  deleteProjectByNumber({ project_number })
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      next(err);
    });
};

exports.postProjectByNumber = (req, res, next) => {
  createProjectByNumber(req.body)
    .then((newProject) => {
      res.status(201).send({ project: newProject[0] });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchProjectByNumber = (req, res, next) => {
  editProjectByNumber(req.body)
    .then((editedProject) => {
      res.status(200).send({ project: editedProject[0] });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getRecordByProject = (req, res, next) => {
  fetchRecordByProject(req.params)
    .then((records) => {
      res.status(200).send(records);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getRecordByRecordId = (req, res, next) => {
  fetchRecordByRecordId(req.params)
    .then((record) => {
      res.status(200).send(record);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getAllRisks = (req, res, next) => {
  fetchAllRisks()
    .then((risks) => {
      res.status(200).send({ risks });
    })
    .catch((err) => {
      next(err);
    });
};
