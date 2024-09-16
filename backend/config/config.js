require('dotenv').config();

const config = {
  mongostring: process.env.MONGOSTRING,
  accesstoken:process.env.ACCESS_TOKEN_SECRET

};

module.exports = Object.freeze(config);
