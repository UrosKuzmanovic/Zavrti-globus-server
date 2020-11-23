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
const sequelize = require("./util/database");

app.use(cors());

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(); // app/json

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

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

app.use((req, res, next) => {
  const status = 404;
  const message = `Cannot ${req.method} ${req.url}`;
  res.status(status).json({ message: message });
});

const PORT = process.env.PORT | 50000;

/*sequelize
  .sync()
  .then((results) => {*/
app.listen(PORT, () => {
  //console.log(results);
  console.log(`Zavrti globus server sluša na portu ${PORT}...`);
});
/*})
  .catch((err) => {
    console.log(err);
  });*/
