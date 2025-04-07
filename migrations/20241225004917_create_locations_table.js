// Constants
const TABLE_TYPE = require("../constants/table-type");

const up = async (knex) => {
  const tableExists = await knex.schema.hasTable(TABLE_TYPE.LOCATION);
  if (!tableExists) {
    await knex.schema.createTable(TABLE_TYPE.LOCATION, (table) => {
      table.timestamps(true, true);
      table.uuid("id", { primaryKey: true, useBinaryUuid: true }).defaultTo(knex.raw("uuid_generate_v4()"));
      table.uuid("country_id").notNullable().references("id").inTable(TABLE_TYPE.COUNTRY);
      table.uuid("trip_id").nullable().references("id").inTable(TABLE_TYPE.TRIP);
      table.string("title", 20).notNullable();
      table.string("description", 300).nullable().defaultTo(null);
      table.string("email", 100).nullable().defaultTo(null);
      table.string("code", 10).nullable().defaultTo(null);
      table.string("phone", 20).nullable().defaultTo(null);
      table.string("line_1", 100).nullable().defaultTo(null);
      table.string("line_2", 100).nullable().defaultTo(null);
      table.string("city", 100).nullable().defaultTo(null);
      table.string("state", 100).nullable().defaultTo(null);
      table.string("pin_code", 20).nullable().defaultTo(null);
      table.integer("latitude").notNullable().defaultTo(0);
      table.integer("longitude").notNullable().defaultTo(0);
    });
  }
};

const down = async (knex) => {
  await knex.schema.dropTableIfExists(TABLE_TYPE.LOCATION);
};

module.exports = { up, down };
