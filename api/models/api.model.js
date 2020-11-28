const fs = require("fs");

exports.fetchApiJson = (cb) => {
  fs.readFile("./endpoints.json", "utf8", (err, apiJSON) => {
    cb(null, apiJSON);
  });
};
