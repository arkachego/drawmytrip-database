// Constants
const TABLE_TYPE = require("../constants/table-type");

const up = async (knex) => {
  const tableExists = await knex.schema.hasTable(TABLE_TYPE.INVOICE);
  if (!tableExists) {
    await knex.schema.createTable(TABLE_TYPE.INVOICE, (table) => {
      table.timestamps(true, true);
      table.uuid("id", { primaryKey: true, useBinaryUuid: true }).defaultTo(knex.raw("uuid_generate_v4()"));
      table.uuid("coupon_id").nullable().references("id").inTable(TABLE_TYPE.COUPON).defaultTo(null);
      table.uuid("address_id").notNullable().references("id").inTable(TABLE_TYPE.ADDRESS);
      table.uuid("subscription_id").nullable().references("id").inTable(TABLE_TYPE.SUBSCRIPTION).defaultTo(null);
      table.uuid("trip_id").nullable().references("id").inTable(TABLE_TYPE.TRIP).defaultTo(null);
      table.string("title", 20).notNullable();
      table.string("description", 300).nullable().defaultTo(null);
      table.decimal("pretotal").unsigned().notNullable();
      table.decimal("discount").unsigned().notNullable();
      table.decimal("subtotal").unsigned().notNullable();
      table.decimal("tax").unsigned().notNullable();
      table.decimal("total").unsigned().notNullable();
    });
  }
};

const down = async (knex) => {
  await knex.schema.dropTableIfExists(TABLE_TYPE.INVOICE);
};

module.exports = { up, down };
