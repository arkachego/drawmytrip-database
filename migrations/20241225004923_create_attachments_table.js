// Constants
const TABLE_TYPE = require("../constants/table-type");

const up = async (knex) => {
  const tableExists = await knex.schema.hasTable(TABLE_TYPE.ATTACHMENT);
  if (!tableExists) {
    await knex.schema.createTable(TABLE_TYPE.ATTACHMENT, (table) => {
      table.timestamps(true, true);
      table.uuid("id", { primaryKey: true, useBinaryUuid: true }).defaultTo(knex.raw("uuid_generate_v4()"));
      table.uuid("parent_id").notNullable();
      table.string("title", 20).notNullable();
      table.string("description", 500).nullable().defaultTo(null);
      table.integer("category").unsigned().notNullable().index();
      table.string("mimetype", 50).notNullable();
      table.bigInteger('size').unsigned().notNullable();
      table.string("key", 500).notNullable();
    });
  }
};

const down = async (knex) => {
  await knex.schema.dropTableIfExists(TABLE_TYPE.ATTACHMENT);
};

module.exports = { up, down };
