// Constants
const TABLE_TYPE = require("../constants/table-type");

const up = async (knex) => {
  const tableExists = await knex.schema.hasTable(TABLE_TYPE.SUBSCRIPTION);
  if (!tableExists) {
    await knex.schema.createTable(TABLE_TYPE.SUBSCRIPTION, (table) => {
      table.timestamps(true, true);
      table.uuid("id", { primaryKey: true, useBinaryUuid: true }).defaultTo(knex.raw("uuid_generate_v4()"));
      table.uuid("product_id").notNullable().references("id").inTable(TABLE_TYPE.PRODUCT);
      table.uuid("user_id").notNullable().references("id").inTable(TABLE_TYPE.USER);
    });
  }
};

const down = async (knex) => {
  await knex.schema.dropTableIfExists(TABLE_TYPE.SUBSCRIPTION);
};

module.exports = { up, down };
