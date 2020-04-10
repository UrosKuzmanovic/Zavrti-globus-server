const express = require('express');
const pool = require('../db/index');
const routes = express.Router();

routes.get('/', async (req, res) => {
    try {
        res.json(await new Promise((resolve, reject) => {
            pool.query('select * from user', (err, results) => {
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
            pool.query('select * from user where userid = ?', id, (err, results) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(results);
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