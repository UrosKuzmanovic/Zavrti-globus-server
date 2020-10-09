const express = require("express");
const pool = require("../db/index");
const routes = express.Router();

routes.get("/", async (req, res) => {
  try {
    res.json(
      await new Promise((resolve, reject) => {
        pool.query("select * from trip", (err, results) => {
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
});

// routes.get('/showdestinations', async (req, res) => {
//     try {
//         res.json(await new Promise((resolve, reject) => {
//             pool.query('select d.destinationid, c.cityname, day(d.traveldate) as dayOfTravel, month(d.traveldate) as monthOfTravel, year(d.traveldate) as yearOfTravel, day(d.returndate) as dayOfReturn, month(d.returndate) as monthOfReturn, year(d.returndate) as yearOfReturn, d.price from destination d join city c where d.cityid = c.cityid', (err, results) => {
//                 if (err) {
//                     return reject(err);
//                 } else {
//                     return resolve(results);
//                 }
//             });
//         }));
//     } catch (e) {
//         console.log(e);
//         res.sendStatus(500);
//     }
// });

// routes.get('/trip/:id', async (req, res) => {
//     let id = req.params.id;
//     try {
//         res.json(await new Promise((resolve, reject) => {
//             pool.query('select d.destinationid as tripid, c.cityname, day(d.traveldate) as dayOfTravel, month(d.traveldate) as monthOfTravel, year(d.traveldate) as yearOfTravel, day(d.returndate) as dayOfReturn, month(d.returndate) as monthOfReturn, year(d.returndate) as yearOfReturn, d.price, a.airportname as airport, d.hotel, d.quote, d.description, d.image as imageSrc from destination d join city c join airport a where d.cityid = c.cityid and d.airportid = a.airportid and d.destinationid = ?', id, (err, results) => {
//                 if (err) {
//                     return reject(err);
//                 } else {
//                     return resolve(results);
//                 }
//             });
//         }));
//     } catch (e) {
//         console.log(e);
//         res.sendStatus(500);
//     }
// });

// routes.get('/:id', async (req, res) => {
//     let id = req.params.id;
//     try {
//         res.json(await new Promise((resolve, reject) => {
//             pool.query('select * from destination where destinationid = ?', [id], (err, results) => {
//                 if (err) {
//                     return reject(err);
//                 } else {
//                     return resolve(results[0]);
//                     //return {opis: 'Nema rezultata'};
//                 }
//             });
//         }));
//     } catch (e) {
//         console.log(e);
//         res.sendStatus(500);
//     }
//     //res.json(members.filter(member => member.id === parseInt(req.params.id)));
// });

routes.get("/listedtrips", async (req, res) => {
  try {
    res.json(
      await new Promise((resolve, reject) => {
        pool.query(
          "SELECT t.tripID, t.city, c.countryID, c.name as countryName, t.travelDate, t.returnDate, t.price, t.imageSrc FROM trip t join country c where t.countryid = c.countryid and t.userID in (select userID from user where role = 'admin');",
          (err, results) => {
            if (err) {
              return reject(err);
            } else {
              return resolve(results);
            }
          }
        );
      })
    );
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

routes.get("/trip/:id", async (req, res) => {
  let id = req.params.id;
  try {
    res.json(
      await new Promise((resolve, reject) => {
        pool.query(
          "SELECT t.tripID, t.city, c.countryID, c.name as countryName, t.price, t.travelDate, t.returnDate, t.postDate, a.airportID, a.airportName, t.baggage, t.hotel, t.hotelLatitude, t.hotelLongitude, t.meal, t.quote, t.author, t.description, t.imageSrc, u.userID, u.firstName, u.lastName, u.role FROM trip t join country c on t.countryID = c.countryID left join airport a on t.airportID = a.airportID join user u on t.userID = u.userID and tripID = ?",
          [id],
          (err, results) => {
            if (err) {
              return reject(err);
            } else {
              return resolve(results[0]);
            }
          }
        );
      })
    );
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

routes.post("/trip/favorite", async (req, res) => {
  let userid = req.body.user;
  let tripid = req.body.trip;
  try {
    res.json(
      await new Promise((resolve, reject) => {
        pool.query(
          "insert into favorite (userID, tripID) values (?,?)",
          [userid, tripid],
          (err, results) => {
            if (err) {
              return reject(err);
            } else {
              return resolve(results);
            }
          }
        );
      })
    );
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

routes.delete("/trip/favorite", async (req, res) => {
  let userid = req.body.user;
  let tripid = req.body.trip;
  try {
    res.json(
      await new Promise((resolve, reject) => {
        pool.query(
          "delete from favorite where userID = ? and tripID = ?",
          [userid, tripid],
          (err, results) => {
            if (err) {
              return reject(err);
            } else {
              return resolve(results[0]);
            }
          }
        );
      })
    );
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

routes.post("/trip/isfavorite", async (req, res) => {
  let userid = req.body.user;
  let tripid = req.body.trip;
  try {
    res.json(
      await new Promise((resolve, reject) => {
        pool.query(
          "select * from favorite where userID = ? and tripID = ?",
          [userid, tripid],
          (err, results) => {
            if (err) {
              return reject(err);
            } else {
              return resolve(results[0]);
            }
          }
        );
      })
    );
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

routes.post("/favoritetrips", async (req, res) => {
  let userid = req.body.user;
  try {
    res.json(
      await new Promise((resolve, reject) => {
        pool.query(
          "SELECT t.tripID, t.city, c.name as country, t.travelDate, t.returnDate, t.price, t.imageSrc FROM trip t join country c where t.countryid = c.countryid and t.tripID in (select tripID from favorite where userID = ?)",
          [userid],
          (err, results) => {
            if (err) {
              return reject(err);
            } else {
              return resolve(results);
            }
          }
        );
      })
    );
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

routes.post("/new-inquiry", async (req, res) => {
  try {
    res.json(
      await new Promise((resolve, reject) => {
        pool.query(
          "insert into trip (city, countryID, travelDate, returnDate, postDate, price, description, userID) values (?,?,?,?,?,?,?,?)",
          [
            req.body.city,
            req.body.countryID,
            req.body.travelDate.toString().split("T")[0],
            req.body.returnDate.toString().split("T")[0],
            req.body.postDate.toString().split("T")[0],
            req.body.price,
            req.body.description,
            req.body.userID,
          ],
          (err, results) => {
            if (err) {
              return reject(err);
            } else {
              return resolve(results);
            }
          }
        );
      })
    );
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

routes.post("/new-trip", async (req, res) => {
  try {
    res.json(
      await new Promise((resolve, reject) => {
        pool.query(
          "insert into trip (city, countryID, price, travelDate, returnDate, postDate, airportID, baggage, hotel, meal, quote, author, description, imageSrc, userID) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
          [
            req.body.city,
            req.body.countryID,
            req.body.price,
            req.body.travelDate.toString().split("T")[0],
            req.body.returnDate.toString().split("T")[0],
            req.body.postDate.toString().split("T")[0],
            req.body.airport,
            req.body.baggage,
            req.body.hotel,
            req.body.meal,
            req.body.quote,
            req.body.author,
            req.body.description,
            req.body.imageSrc,
            req.body.userID,
          ],
          (err, results) => {
            if (err) {
              return reject(err);
            } else {
              return resolve(results);
            }
          }
        );
      })
    );
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

routes.post("/update-trip", async (req, res) => {
  try {
    res.json(
      await new Promise((resolve, reject) => {
        pool.query(
          "update trip set city = ?, countryID = ?, price = ?, travelDate = ?, returnDate = ?, postDate = ?, airportID = ?, baggage = ?, hotel = ?, meal = ?, quote = ?, author = ?, description = ?, imageSrc = ?, userID = ? where tripID = ?",
          [
            req.body.city,
            req.body.countryID,
            req.body.price,
            req.body.travelDate.toString().split("T")[0],
            req.body.returnDate.toString().split("T")[0],
            req.body.postDate.toString().split("T")[0],
            req.body.airport,
            req.body.baggage,
            req.body.hotel,
            req.body.meal,
            req.body.quote,
            req.body.author,
            req.body.description,
            req.body.imageSrc,
            req.body.userID,
            req.body.tripID
          ],
          (err, results) => {
            if (err) {
              return reject(err);
            } else {
              return resolve(results);
            }
          }
        );
      })
    );
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

module.exports = routes;
