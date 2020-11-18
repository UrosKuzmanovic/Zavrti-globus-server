const express = require("express");
const cors = require("cors");
//const logger = require('./middleware/logger');

const airportsRoutes = require("./routes/airports");
const bookingsRoutes = require("./routes/bookings");
const continentsRoutes = require("./routes/continents");
const countriesRoutes = require("./routes/countries");
const favoritesRoutes = require("./routes/favorites");
const tripsRoutes = require("./routes/trips");
const usersRoutes = require("./routes/users");

const app = express();

app.use(cors());

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(); // app/json

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// API
app.use("/api/airports", airportsRoutes);
app.use("/api/bookings", bookingsRoutes);
app.use("/api/continents", continentsRoutes);
app.use("/api/countries", countriesRoutes);
app.use("/api/favorites", favoritesRoutes);
app.use("/api/trips", tripsRoutes);
app.use("/api/users", usersRoutes);

const PORT = process.env.PORT | 50000;
app.listen(PORT, () => {
  console.log(`Zavrti globus server sluša na portu ${PORT}...`);
});
