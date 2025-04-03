// Constants
const TABLE_TYPE = require("../constants/table-type");
const TRIP_STATUS_TYPE = require("../constants/trip-status-type");

const up = async (knex) => {
  const tableExists = await knex.schema.hasTable(TABLE_TYPE.TRIP);
  if (!tableExists) {
    await knex.schema.createTable(TABLE_TYPE.TRIP, (table) => {
      table.timestamps(true, true);
      table.uuid("id", { primaryKey: true, useBinaryUuid: true }).defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("title", 20).notNullable();
      table.string("description", 500).nullable().defaultTo(null);
      table.integer("status").unsigned().notNullable().defaultTo(TRIP_STATUS_TYPE.CREATED).index();
      table.integer("duration").unsigned().nullable().defaultTo(null);
      table.decimal("distance").unsigned().nullable().defaultTo(null);
      table.decimal("budget").unsigned().nullable().defaultTo(null);
      table.decimal("expense").unsigned().nullable().defaultTo(null);
      table.datetime("starts_at").nullable().defaultTo(null);
      table.datetime("finishes_at").nullable().defaultTo(null);
      table.integer("member_limit").unsigned().notNullable().defaultTo(1);
      table.integer("waypoint_limit").unsigned().notNullable().defaultTo(10);
      table.integer("distance_limit").unsigned().notNullable().defaultTo(50);
      table.integer("action_item_limit").unsigned().notNullable().defaultTo(10);
      table.integer("expense_limit").unsigned().notNullable().defaultTo(10);
    });
  }
};

const down = async (knex) => {
  await knex.schema.dropTableIfExists(TABLE_TYPE.TRIP);
};

module.exports = { up, down };
