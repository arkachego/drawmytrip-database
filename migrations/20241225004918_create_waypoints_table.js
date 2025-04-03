// Constants
const TABLE_TYPE = require("../constants/table-type");

const up = async (knex) => {
  const tableExists = await knex.schema.hasTable(TABLE_TYPE.WAYPOINT);
  if (!tableExists) {
    await knex.schema.createTable(TABLE_TYPE.WAYPOINT, (table) => {
      table.timestamps(true, true);
      table.uuid("id", { primaryKey: true, useBinaryUuid: true }).defaultTo(knex.raw("uuid_generate_v4()"));
      table.uuid("location_id").notNullable().references("id").inTable(TABLE_TYPE.LOCATION);
      table.integer("order").unsigned().notNullable().index();
      table.datetime("arrives_at").nullable().defaultTo(null);
      table.datetime("departs_at").nullable().defaultTo(null);
      table.unique(['location_id', 'order']);
    });
  }
};

const down = async (knex) => {
  await knex.schema.dropTableIfExists(TABLE_TYPE.WAYPOINT);
};

module.exports = { up, down };
