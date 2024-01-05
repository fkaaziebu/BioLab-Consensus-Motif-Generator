const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("biolab", "fkaaziebu", "12345678910", {
  dialect: "sqlite",
  storage: "database.sqlite",
  logging: false,
});

module.exports = sequelize;
