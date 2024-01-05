const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize");

class Result extends Model {}

Result.init(
  {
    count: {
      type: DataTypes.STRING,
    },
    profile: {
      type: DataTypes.STRING,
    },
    consensus: {
      type: DataTypes.STRING,
    },
  },
  { sequelize, modelName: "result" }
);

module.exports = Result;
