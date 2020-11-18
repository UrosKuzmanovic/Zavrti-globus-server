const pool = require("../db/index");

export function getAirports(req, res, next) {
    try {
        res.json(
            await new Promise((resolve, reject) => {
                pool.query("select * from airport", (err, results) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(results);
                    }
                });
            })
        );
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}