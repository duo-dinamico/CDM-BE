const ENV = process.env.NODE_ENV || "test";
const testData = require("./test-data");
// const devData = require("./dev-data");

const data = { test: testData };

module.exports = data[ENV];
