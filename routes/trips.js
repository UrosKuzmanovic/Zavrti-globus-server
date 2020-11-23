const express = require("express");
const tripsController = require("../controllers/trips");
const routes = express.Router();

routes.get("/", tripsController.getTrips);

routes.get("/listedtrips", tripsController.getListedTrips);

routes.get("/trip/:id", tripsController.getTripById);

// prebaciti
routes.post("/trip/favorite", tripsController.postFavoriteTrip);

// prebaciti
routes.delete("/trip/favorite", tripsController.deleteFavoriteTrip);

// prebaciti
routes.post("/trip/isfavorite", tripsController.isFavorite); // promeniti u get

// prebaciti
routes.post("/favoritetrips", tripsController.getFavoriteTrips); // promeniti u get

routes.post("/new-inquiry", tripsController.postNewInquiry);

routes.post("/new-trip", tripsController.postTrip); // promeniti u post trip

routes.post("/update-trip", tripsController.updateTrip);

routes.post("/inquiry-trips", tripsController.getInquiryTrips);

routes.get("/all-inquiry-trips", tripsController.getAllInquiryTrips);

module.exports = routes;