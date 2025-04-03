// Libraries
require("dotenv").config();

// Constants
const KNEX_CONFIG = require("./constants/knex-config");

module.exports = {
  ...KNEX_CONFIG,
  migrations: {
    database: process.env.DATABASE_NAME,
    directory: "./migrations",
    tableName: "migrations",
  },
  onUpdateTrigger: table => `
    CREATE TRIGGER ${table}_updated_at
    BEFORE UPDATE ON ${table}
    FOR EACH ROW
    EXECUTE PROCEDURE on_update_timestamp();
  `,
};
