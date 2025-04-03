const Axios = require("axios");

const fetchCountries = () => {
  return new Promise((resolve, reject) => {
    Axios({
      url: 'https://countriesnow.space/api/v0.1/countries/currency',
      method: 'GET',
      maxBodyLength: Infinity,
    })
    .then(response => resolve(response.data.data.map(country => {
      return {
        title: country.name,
        iso_code: country.iso3,
        currency: country.currency,
        is_allowed: country.iso3 === 'IND',
      };
    })))
    .catch(error => reject(error));
  });
};

module.exports = {
  fetchCountries,
};
