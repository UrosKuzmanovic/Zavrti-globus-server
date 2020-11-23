const express = require("express");
const airportController = require("../controllers/airports");
//const pool = require("../db/index"); // promenice se
const routes = express.Router();

routes.get("/", airportController.getAirports);

module.exports = routes;