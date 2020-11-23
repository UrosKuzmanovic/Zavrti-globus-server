const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Country = sequelize.define("country", {
  countryID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: false,
  },
  name: Sequelize.STRING,
  continentID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  flagSrc: Sequelize.STRING,
});

module.exports = Country;
