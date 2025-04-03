// Constants
const TABLE_TYPE = require("../constants/table-type");

const up = async (knex) => {
  const tableExists = await knex.schema.hasTable(TABLE_TYPE.FOOTPRINT);
  if (!tableExists) {
    await knex.schema.createTable(TABLE_TYPE.FOOTPRINT, (table) => {
      table.timestamps(true, true);
      table.uuid("id", { primaryKey: true, useBinaryUuid: true }).defaultTo(knex.raw("uuid_generate_v4()"));
      table.uuid("participant_id").notNullable().references("id").inTable(TABLE_TYPE.PARTICIPANT);
      table.uuid("waypoint_id").notNullable().references("id").inTable(TABLE_TYPE.WAYPOINT);
      table.unique(['participant_id', 'waypoint_id']);
    });
  }
};

const down = async (knex) => {
  await knex.schema.dropTableIfExists(TABLE_TYPE.FOOTPRINT);
};

module.exports = { up, down };
