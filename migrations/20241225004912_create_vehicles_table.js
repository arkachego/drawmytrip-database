// Constants
const TABLE_TYPE = require("../constants/table-type");

const up = async (knex) => {
  const tableExists = await knex.schema.hasTable(TABLE_TYPE.VEHICLE);
  if (!tableExists) {
    await knex.schema.createTable(TABLE_TYPE.VEHICLE, (table) => {
      table.timestamps(true, true);
      table.uuid("id", { primaryKey: true, useBinaryUuid: true }).defaultTo(knex.raw("uuid_generate_v4()"));
      table.uuid("user_id").notNullable().references("id").inTable(TABLE_TYPE.USER);
      table.string("title", 20).notNullable();
      table.string("description", 300).nullable().defaultTo(null);
      table.string("image", 250).nullable().defaultTo(null);
      table.string("category", 10).notNullable();
      table.string("fuel", 20).notNullable();
      table.integer("mileage").unsigned().notNullable();
      table.integer("occupancy").unsigned().notNullable();
      table.string("registration", 20).nullable().defaultTo(null).index();
    });
  }
};

const down = async (knex) => {
  await knex.schema.dropTableIfExists(TABLE_TYPE.VEHICLE);
};

module.exports = { up, down };
