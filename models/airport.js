const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Airport = sequelize.define("airport", {
  airportID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  airportName: Sequelize.STRING,
});

module.exports = Airport;
