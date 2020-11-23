const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Favorite = sequelize.define("favorite", {
  userID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  tripID: {
    type: Sequelize.INTEGER,
    primatyKey: true,
    allowNull: false,
  },
});

module.exports = Favorite;
