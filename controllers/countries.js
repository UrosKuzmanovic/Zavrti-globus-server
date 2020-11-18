const pool = require("../db/index");

export function getCountries(req, res) {
    try {
        res.json(
            await new Promise((resolve, reject) => {
                pool.query("select cou.countryID, cou.name as countryName, cou.flagSrc, con.continentID, con.name as continentName from country cou join continent con on cou.continentID = con.continentID order by cou.name asc", (err, results) => {
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