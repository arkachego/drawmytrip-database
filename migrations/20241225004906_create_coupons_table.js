// Constants
const TABLE_TYPE = require("../constants/table-type");

const up = async (knex) => {
  const tableExists = await knex.schema.hasTable(TABLE_TYPE.COUPON);
  if (!tableExists) {
    await knex.schema.createTable(TABLE_TYPE.COUPON, (table) => {
      table.timestamps(true, true);
      table.uuid("id", { primaryKey: true, useBinaryUuid: true }).defaultTo(knex.raw("uuid_generate_v4()"));
      table.string("title", 100).notNullable();
      table.string("description", 300).nullable().defaultTo(null);
    });
  }
};

const down = async (knex) => {
  await knex.schema.dropTableIfExists(TABLE_TYPE.COUPON);
};

module.exports = { up, down };
