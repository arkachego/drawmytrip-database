// Constants
const TABLE_TYPE = require("../constants/table-type");

const up = async (knex) => {
  const tableExists = await knex.schema.hasTable(TABLE_TYPE.ADDRESS);
  if (!tableExists) {
    await knex.schema.createTable(TABLE_TYPE.ADDRESS, (table) => {
      table.timestamps(true, true);
      table.uuid("id", { primaryKey: true, useBinaryUuid: true }).defaultTo(knex.raw("uuid_generate_v4()"));
      table.uuid("country_id").notNullable().references("id").inTable(TABLE_TYPE.COUNTRY);
      table.uuid("user_id").notNullable().references("id").inTable(TABLE_TYPE.USER);
      table.string("line_1", 100).nullable().defaultTo(null);
      table.string("line_2", 100).nullable().defaultTo(null);
      table.string("city", 100).nullable().defaultTo(null);
      table.string("state", 100).nullable().defaultTo(null);
      table.string("pin_code", 20).nullable().defaultTo(null);
      table.boolean("is_default").notNullable().defaultTo(false);
      table.boolean("is_billing").notNullable().defaultTo(false);
    });
  }
};

const down = async (knex) => {
  await knex.schema.dropTableIfExists(TABLE_TYPE.ADDRESS);
};

module.exports = { up, down };
