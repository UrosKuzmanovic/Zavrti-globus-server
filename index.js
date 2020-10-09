const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger');

const users         = require('./api/users');
Dodate const trips         = require('./api/trips');
const cities        = require('./api/cities');
const countries     = require('./api/countries');
const airports      = require('./api/airports');

const app = express();

app.use(cors());

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// API
//app.use('/api/members', routes);
app.use('/api/users',       users);
app.use('/api/trips',       trips);
app.use('/api/cities',      cities);
app.use('/api/countries',   countries);
app.use('/api/airports',    airports);

const PORT = process.env.PORT | 50000;
app.listen(PORT, () => {
    console.log(`Zavrti globus server sluša na portu ${PORT}...`);
});