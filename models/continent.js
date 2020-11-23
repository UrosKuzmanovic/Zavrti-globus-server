const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Continent = sequelize.define("continent", {
  continentID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: Sequelize.STRING,
});

module.exports = Continent;
