// Constants
const TABLE_TYPE = require("../constants/table-type");

const up = async (knex) => {
  const tableExists = await knex.schema.hasTable(TABLE_TYPE.PRICE);
  if (!tableExists) {
    await knex.schema.createTable(TABLE_TYPE.PRICE, (table) => {
      table.timestamps(true, true);
      table.uuid("id", { primaryKey: true, useBinaryUuid: true }).defaultTo(knex.raw("uuid_generate_v4()"));
      table.uuid("country_id").notNullable().references("id").inTable(TABLE_TYPE.COUNTRY);
      table.uuid("product_id").notNullable().references("id").inTable(TABLE_TYPE.PRODUCT);
      table.decimal("amount").unsigned().notNullable();
      table.integer("months").unsigned().nullable().defaultTo(null);
    });
  }
};

const down = async (knex) => {
  await knex.schema.dropTableIfExists(TABLE_TYPE.PRICE);
};

module.exports = { up, down };
