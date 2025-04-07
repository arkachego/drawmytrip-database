// Constants
const TABLE_TYPE = require("../constants/table-type");
const ACTION_ITEM_TYPE = require("../constants/action-item-type");

const up = async (knex) => {
  const tableExists = await knex.schema.hasTable(TABLE_TYPE.ACTION_ITEM);
  if (!tableExists) {
    await knex.schema.createTable(TABLE_TYPE.ACTION_ITEM, (table) => {
      table.timestamps(true, true);
      table.uuid("id", { primaryKey: true, useBinaryUuid: true }).defaultTo(knex.raw("uuid_generate_v4()"));
      table.uuid("participant_id").notNullable().references("id").inTable(TABLE_TYPE.PARTICIPANT);
      table.uuid("waypoint_id").notNullable().references("id").inTable(TABLE_TYPE.WAYPOINT);
      table.string("title", 20).notNullable();
      table.string("description", 300).nullable().defaultTo(null);
      table.integer("category").unsigned().notNullable().defaultTo(ACTION_ITEM_TYPE.INTERIM).index();
    });
  }
};

const down = async (knex) => {
  await knex.schema.dropTableIfExists(TABLE_TYPE.ACTION_ITEM);
};

module.exports = { up, down };
