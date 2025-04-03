const up = async (knex) => {
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
};

const down = () => {};

module.exports = { up, down };
