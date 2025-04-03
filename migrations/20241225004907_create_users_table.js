// Constants
const TABLE_TYPE = require("../constants/table-type");

const up = async (knex) => {
  const tableExists = await knex.schema.hasTable(TABLE_TYPE.USER);
  if (!tableExists) {
    await knex.schema.createTable(TABLE_TYPE.USER, (table) => {
      table.timestamps(true, true);
      table.uuid("id", { primaryKey: true, useBinaryUuid: true }).defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("first_name", 25).notNullable();
      table.string("last_name", 25).notNullable();
      table.boolean("is_blocked").notNullable().defaultTo(false);
    });
  }
};

const down = async (knex) => {
  await knex.schema.dropTableIfExists(TABLE_TYPE.USER);
};

module.exports = { up, down };
