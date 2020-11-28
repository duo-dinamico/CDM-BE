const { DB_URL } = process.env;
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
      database: "cdmrr",
      user: "joao",
      password: "password",
    },
  },
  test: {
    connection: {
      database: "cdmrr_test",
      user: "joao",
      password: "password",
    },
  },
  production: {
    connection: {
      connectionString: DB_URL,
      ssl: { rejectUnauthorized: false },
    },
  },
};

module.exports = { ...customConfig[ENV], ...baseConfig };
