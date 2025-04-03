// Constants
const TABLE_TYPE = require("../constants/table-type");
const CONVEYANCE_TYPE = require("../constants/conveyance-type");

const up = async (knex) => {
  const tableExists = await knex.schema.hasTable(TABLE_TYPE.CONVEYANCE);
  if (!tableExists) {
    await knex.schema.createTable(TABLE_TYPE.CONVEYANCE, (table) => {
      table.timestamps(true, true);
      table.uuid("id", { primaryKey: true, useBinaryUuid: true }).defaultTo(knex.raw("uuid_generate_v4()"));
      table.uuid("vehicle_id").nullable().references("id").inTable(TABLE_TYPE.VEHICLE);
      table.uuid("trip_id").notNullable().references("id").inTable(TABLE_TYPE.TRIP);
      table.integer("category").unsigned().notNullable().defaultTo(CONVEYANCE_TYPE.ROAD).index();
      table.unique(['vehicle_id', 'trip_id']);
    });
  }
};

const down = async (knex) => {
  await knex.schema.dropTableIfExists(TABLE_TYPE.CONVEYANCE);
};

module.exports = { up, down };
