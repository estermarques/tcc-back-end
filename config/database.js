require('dotenv').config();
const { Sequelize } = require('sequelize');

module.exports.sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PWD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT
});
