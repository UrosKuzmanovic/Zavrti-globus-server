const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger');

const users         = require('./api/users');
const destinations  = require('./api/destinations');
const cities        = require('./api/cities');

const app = express();

app.use(cors());

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// API
//app.use('/api/members', routes);
app.use('/api/users', users);
app.use('/api/destinations', destinations);
app.use('/api/cities', cities);

const PORT = process.env.PORT | 5000;
app.listen(PORT, () => {
    console.log(`Zavrti globus server sluša na portu ${PORT}...`);
});