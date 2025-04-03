// Constants
const TABLE_TYPE = require("../constants/table-type");
const DATE_FORMAT = require("../constants/date-format");
const TIME_FORMAT = require("../constants/time-format");

const up = async (knex) => {
  const tableExists = await knex.schema.hasTable(TABLE_TYPE.PREFERENCE);
  if (!tableExists) {
    await knex.schema.createTable(TABLE_TYPE.PREFERENCE, (table) => {
      // Stamp & Key
      table.timestamps(true, true);
      table.uuid("id", { primaryKey: true, useBinaryUuid: true }).defaultTo(knex.raw("uuid_generate_v4()"));
      table.uuid("user_id").notNullable().references("id").inTable(TABLE_TYPE.USER);
      table.string("date_format", 10).notNullable().defaultTo(DATE_FORMAT.OPTION_0);
      table.string("time_format", 10).notNullable().defaultTo(TIME_FORMAT.HOUR_12);
    });
  }
};

const down = async (knex) => {
  await knex.schema.dropTableIfExists(TABLE_TYPE.PREFERENCE);
};

module.exports = { up, down };
