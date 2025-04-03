// Constants
const TABLE_TYPE = require("../constants/table-type");

const up = async (knex) => {
  const tableExists = await knex.schema.hasTable(TABLE_TYPE.CONTACT);
  if (!tableExists) {
    await knex.schema.createTable(TABLE_TYPE.CONTACT, (table) => {
      table.timestamps(true, true);
      table.uuid("id", { primaryKey: true, useBinaryUuid: true }).defaultTo(knex.raw("uuid_generate_v4()"));
      table.uuid("user_id").notNullable().references("id").inTable(TABLE_TYPE.USER);
      table.string("email", 100).notNullable();
      table.string("code", 10).nullable().defaultTo(null);
      table.string("phone", 20).nullable().defaultTo(null);
    });
  }
};

const down = async (knex) => {
  await knex.schema.dropTableIfExists(TABLE_TYPE.CONTACT);
};

module.exports = { up, down };
