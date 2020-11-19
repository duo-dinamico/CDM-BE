exports.errors405s = (req, res, next) => {
  res.status(405).send({ msg: "Method not allowed." });
};

exports.PSQLerrors = (err, req, res, next) => {
  if (err.code === "23505") {
    res.status(400).send({ msg: "Data already present in the database." });
  } else if (err.code === "23502") {
    res.status(400).send({ msg: `Column ${err.column} cannot be empty.` });
  } else {
    next(err);
  }
};

exports.customError = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.catchAll = (err, req, res, next) => {
  res.status(418).send({ msg: "oh oh...", error: err });
};
