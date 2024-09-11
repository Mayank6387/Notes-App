require('dotenv').config();

const config = {
  mongostring: process.env.MONGOSTRING

};

module.exports = Object.freeze(config);
