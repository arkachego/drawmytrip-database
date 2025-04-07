// Constants
const TABLE_TYPE = require("../constants/table-type");

const up = async (knex) => {
  const tableExists = await knex.schema.hasTable(TABLE_TYPE.JOURNEY);
  if (!tableExists) {
    await knex.schema.createTable(TABLE_TYPE.JOURNEY, (table) => {
      table.timestamps(true, true);
      table.uuid("id", { primaryKey: true, useBinaryUuid: true }).defaultTo(knex.raw("uuid_generate_v4()"));
      table.uuid("trip_id").notNullable().references("id").inTable(TABLE_TYPE.TRIP);
      table.uuid("conveyance_id").notNullable().references("id").inTable(TABLE_TYPE.CONVEYANCE);
      table.uuid("start_id").notNullable().references("id").inTable(TABLE_TYPE.WAYPOINT);
      table.uuid("finish_id").notNullable().references("id").inTable(TABLE_TYPE.WAYPOINT);
      table.string("title", 20).notNullable();
      table.string("description", 300).nullable().defaultTo(null);
      table.integer("order").unsigned().notNullable().index();
      table.decimal("distance").unsigned().notNullable();
      table.integer("duration").unsigned().nullable().defaultTo(null);
    });
  }
};

const down = async (knex) => {
  await knex.schema.dropTableIfExists(TABLE_TYPE.JOURNEY);
};

module.exports = { up, down };
