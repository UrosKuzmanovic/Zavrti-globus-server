const Sequelize = require("sequelize");

const sequelize = new Sequelize("zavrtiglobus", "uk", "Ukikuzma96Pi", {
  dialect: "mysql",
  host: "localhost",
  //logging: false
});

module.exports = sequelize;
