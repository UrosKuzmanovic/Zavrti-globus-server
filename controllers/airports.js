const pool = require("../db/index");

exports.getAirports = async(req, res, next) => {
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
        next(e);
    }
}