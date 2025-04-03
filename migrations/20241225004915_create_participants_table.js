// Constants
const TABLE_TYPE = require("../constants/table-type");
const PARTICIPANT_TYPE = require("../constants/participant-type");

const up = async (knex) => {
  const tableExists = await knex.schema.hasTable(TABLE_TYPE.PARTICIPANT);
  if (!tableExists) {
    await knex.schema.createTable(TABLE_TYPE.PARTICIPANT, (table) => {
      table.timestamps(true, true);
      table.uuid("id", { primaryKey: true, useBinaryUuid: true }).defaultTo(knex.raw("uuid_generate_v4()"));
      table.uuid("user_id").notNullable().references("id").inTable(TABLE_TYPE.USER);
      table.uuid("trip_id").notNullable().references("id").inTable(TABLE_TYPE.TRIP);
      table.integer("category").unsigned().notNullable().defaultTo(PARTICIPANT_TYPE.ADMIN).index();
      table.unique(['user_id', 'trip_id']);
    });
  }
};

const down = async (knex) => {
  await knex.schema.dropTableIfExists(TABLE_TYPE.PARTICIPANT);
};

module.exports = { up, down };
