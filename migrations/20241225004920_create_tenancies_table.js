// Constants
const TABLE_TYPE = require("../constants/table-type");

const up = async (knex) => {
  const tableExists = await knex.schema.hasTable(TABLE_TYPE.TENANCY);
  if (!tableExists) {
    await knex.schema.createTable(TABLE_TYPE.TENANCY, (table) => {
      table.timestamps(true, true);
      table.uuid("id", { primaryKey: true, useBinaryUuid: true }).defaultTo(knex.raw("uuid_generate_v4()"));
      table.uuid("participant_id").notNullable().references("id").inTable(TABLE_TYPE.PARTICIPANT);
      table.uuid("conveyance_id").notNullable().references("id").inTable(TABLE_TYPE.CONVEYANCE);
      table.uuid("journey_id").notNullable().references("id").inTable(TABLE_TYPE.JOURNEY);
      table.unique(['participant_id', 'conveyance_id', 'journey_id']);
    });
  }
};

const down = async (knex) => {
  await knex.schema.dropTableIfExists(TABLE_TYPE.TENANCY);
};

module.exports = { up, down };
