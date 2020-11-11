// const { DB_URL } = process.env;
const ENV = process.env.NODE_ENV || "test";

const baseConfig = {
  client: "pg",
  migrations: {
    directory: "./db/migrations",
  },
  seeds: {
    directory: "./db/seeds",
  },
};

const customConfig = {
  development: {
    connection: {
      database: "CDMRR",
      user: "joao",
      password: "password",
    },
  },
  test: {
    connection: {
      database: "CDMRR_test",
      user: "joao",
      password: "password",
    },
  },
};

// const log = console.log;
// console.log = (...args) => {
//   if (!/FsMigrations/.test(args[0])) log(...args);
// };

module.exports = { ...customConfig[ENV], ...baseConfig };
