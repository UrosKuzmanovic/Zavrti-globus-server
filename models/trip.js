const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Trip = sequelize.define("trip", {
  tripID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  city: Sequelize.STRING,
  countryID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  travelDate: Sequelize.DATE,
  returnDate: Sequelize.DATE,
  postDate: Sequelize.DATE,
  price: Sequelize.INTEGER,
  hotel: Sequelize.STRING,
  hotelLatitude: Sequelize.DOUBLE,
  hotelLongitude: Sequelize.DOUBLE,
  airportID: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  baggage: Sequelize.STRING,
  quote: Sequelize.STRING,
  author: Sequelize.STRING,
  meal: Sequelize.STRING,
  description: Sequelize.STRING,
  imageSrc: Sequelize.STRING,
  userID: {
    tupe: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Trip;
