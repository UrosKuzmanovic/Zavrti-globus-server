const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Booking = sequelize.define("booking", {
  bookingID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  userID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  tripID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  date: Sequelize.DATE,
});

module.exports = Booking;
