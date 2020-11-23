const express = require("express");
const countriesController = require('../controllers/countries')
const routes = express.Router();

routes.get("/", countriesController.getCountries);

module.exports = routes;
