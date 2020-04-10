const express = require('express');
const pool = require('../db/index');
const routes = express.Router();

routes.get('/', async (req, res) => {
    try {
        res.json(await new Promise((resolve, reject) => {
            pool.query('select * from destination', (err, results) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(results);
                }
            });
        }));
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

routes.get('/showdestinations', async (req, res) => {
    try {
        res.json(await new Promise((resolve, reject) => {
            pool.query('select d.destinationid, c.cityname, day(d.traveldate) as dayOfTravel, month(d.traveldate) as monthOfTravel, year(d.traveldate) as yearOfTravel, day(d.returndate) as dayOfReturn, month(d.returndate) as monthOfReturn, year(d.returndate) as yearOfReturn, d.price from destination d join city c where d.cityid = c.cityid', (err, results) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(results);
                }
            });
        }));
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

routes.get('/trip/:id', async (req, res) => {
    let id = req.params.id;
    try {
        res.json(await new Promise((resolve, reject) => {
            pool.query('select d.destinationid as tripid, c.cityname, day(d.traveldate) as dayOfTravel, month(d.traveldate) as monthOfTravel, year(d.traveldate) as yearOfTravel, day(d.returndate) as dayOfReturn, month(d.returndate) as monthOfReturn, year(d.returndate) as yearOfReturn, d.price, a.airportname as airport, d.hotel, d.quote, d.description, d.image as imageSrc from destination d join city c join airport a where d.cityid = c.cityid and d.airportid = a.airportid and d.destinationid = ?', id, (err, results) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(results);
                }
            });
        }));
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

routes.get('/:id', async (req, res) => {
    let id = req.params.id;
    try {
        res.json(await new Promise((resolve, reject) => {
            pool.query('select * from destination where destinationid = ?', [id], (err, results) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(results[0]);
                    //return {opis: 'Nema rezultata'};
                }
            });
        }));
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
    //res.json(members.filter(member => member.id === parseInt(req.params.id)));
});

module.exports = routes;