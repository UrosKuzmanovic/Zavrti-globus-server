const express = require("express");
const usersController = require('../controllers/users');
const routes = express.Router();

routes.get("/", usersController.getUsers);

routes.get("/id/:id", usersController.getUserById); // izbaciti id iz rute

routes.post("/signin", usersController.signinUser);

routes.post("/signup", usersController.signupUser);

module.exports = routes;