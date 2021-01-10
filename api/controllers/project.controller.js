const {
  fetchProjectByNumber,
  deleteProjectByNumber,
  createProjectByNumber,
  editProjectByNumber,
  fetchRecordByProject,
  fetchOneRecordByProject,
  deleteOneRecordFromProject,
  insertOneRecordFromProject,
  updateOneRecordFromProject,
  fetchAllRisks,
  fetchRiskById,
  editRiskById,
  addOneRisk,
  deleteRiskById,
} = require("../models/project.model");

exports.getProjectByNumber = (req, res, next) => {
  const { project_number } = req.params;
  fetchProjectByNumber({ project_number })
    .then((project) => {
      res.status(200).send({ project: project[0] });
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
  const { project_number } = req.params;
  editProjectByNumber(project_number, req.body)
    .then((editedProject) => {
      res.status(200).send({ project: editedProject[0] });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getRecordByProject = (req, res, next) => {
  const { project_number } = req.params;
  fetchRecordByProject(project_number, req.query)
    .then((records) => {
      res.status(200).send({ records });
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

exports.getOneRecordByProject = (req, res, next) => {
  fetchOneRecordByProject(req.params)
    .then((record) => {
      res.status(200).send({ record: record[0] });
    })
    .catch((err) => {
      next(err);
    });
};

exports.delOneRecord = (req, res, next) => {
  deleteOneRecordFromProject(req.params)
    .then((record) => {
      res.status(200).send(record);
    })
    .catch((err) => {
      next(err);
    });
};

exports.postOneRecord = (req, res, next) => {
  insertOneRecordFromProject(req.body, req.params)
    .then((record) => {
      res.status(201).send({ record: record[0] });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchOneRecord = (req, res, next) => {
  updateOneRecordFromProject(req.body, req.params)
    .then((record) => {
      res.status(201).send({ record: record[0] });
    })
    .catch((err) => {
      next(err);
    });
};

// Risks
exports.getAllRisks = (req, res, next) => {
  const { project_number } = req.params;
  fetchAllRisks(project_number, req.query)
    .then((risks) => {
      res.status(200).send({ risks });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getOneRisk = (req, res, next) => {
  fetchRiskById(req.params)
    .then((risk) => {
      res.status(200).send({ risk });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchOneRisk = (req, res, next) => {
  editRiskById(req.body, req.params)
    .then((risk) => {
      res.status(200).send({ risk: risk[0] });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postOneRisk = (req, res, next) => {
  const { project_number } = req.params;
  addOneRisk(project_number, req.body)
    .then((newRisk) => {
      res.status(200).send({ risk: newRisk[0] });
    })
    .catch((err) => {
      next(err);
    });
};

exports.delOneRisk = (req, res, next) => {
  deleteRiskById(req.params)
    .then((risk) => {
      res.status(200).send({ risk: risk[0] });
    })
    .catch((err) => {
      next(err);
    });
};
