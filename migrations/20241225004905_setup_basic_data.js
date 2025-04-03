// Constants
const TABLE_TYPE = require("../constants/table-type");
const PRODUCT_TYPE = require("../constants/product-type");

// Utilities
const { fetchCountries } = require("../utilities/country");

const up = async (knex) => {
  const countries = await fetchCountries();
  await knex(TABLE_TYPE.COUNTRY).insert(countries);
  const [ india ] = await knex(TABLE_TYPE.COUNTRY).select().where('iso_code', 'IND');

  await knex(TABLE_TYPE.PRODUCT).insert([
    {
      title: PRODUCT_TYPE.STORAGE,
      description: 'Product with recurring price',
      unit: 'GB-Month',
      recurring: true,
    },
    {
      title: PRODUCT_TYPE.MEMBER,
      description: 'Product with fixed price',
      unit: 'NO',
    },
    {
      title: PRODUCT_TYPE.WAYPOINT,
      description: 'Product with fixed price',
      unit: 'NO-Member',
    },
    {
      title: PRODUCT_TYPE.DISTANCE,
      description: 'Product with fixed price',
      unit: 'KM-Member',
    },
    {
      title: PRODUCT_TYPE.ACTION_ITEM,
      description: 'Product with fixed price',
      unit: 'NO',
    },
    {
      title: PRODUCT_TYPE.EXPENSE,
      description: 'Product with fixed price',
      unit: 'NO',
    },
  ]);
  const products = await knex(TABLE_TYPE.PRODUCT).select();
  
  const prices = products.map(product => {
    const price = {
      country_id: india.id,
      product_id: product.id,
    };
    switch (product.title) {
      case PRODUCT_TYPE.MEMBER: {
        price.amount = 10;
        break;
      }
      case PRODUCT_TYPE.WAYPOINT: {
        price.amount = 10;
        break;
      }
      case PRODUCT_TYPE.DISTANCE: {
        price.amount = 10;
        break;
      }
      case PRODUCT_TYPE.ACTION_ITEM: {
        price.amount = 10;
        break;
      }
      case PRODUCT_TYPE.EXPENSE: {
        price.amount = 10;
        break;
      }
      default: {
        price.amount = 15;
        break;
      }
    }
    if (!product.recurring) {
      return price;
    }
    return [
      {
        ...price,
        months: 1,
      },
      {
        ...price,
        amount: price.amount * 12,
        months: 12,
      }
    ];
  }).flat();
  await knex(TABLE_TYPE.PRICE).insert(prices);
};

const down = async (knex) => {
  
};

module.exports = { up, down };
