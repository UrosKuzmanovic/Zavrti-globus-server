const pool = require("../db/index");

exports.getTrips = async (req, res) => {
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
};

exports.getListedTrips = async (req, res) => {
  try {
    res.json(
      await new Promise((resolve, reject) => {
        pool.query(
          "SELECT t.tripID, t.city, c.countryID, c.name as countryName, t.travelDate, t.returnDate, t.price, t.imageSrc FROM trip t join country c where t.countryid = c.countryid and t.userID in (select userID from user where role = 'admin') order by postDate desc",
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
};

exports.getTripById = async (req, res) => {
  let id = req.params.id;
  try {
    res.json(
      await new Promise((resolve, reject) => {
        pool.query(
          "SELECT t.tripID, t.city, c.countryID, c.name as countryName, c.flagSrc as countryFlagSrc, t.price, t.travelDate, t.returnDate, t.postDate, a.airportID, a.airportName, t.baggage, t.hotel, t.hotelLatitude, t.hotelLongitude, t.meal, t.quote, t.author, t.description, t.imageSrc, u.userID, u.firstName, u.lastName, u.role FROM trip t join country c on t.countryID = c.countryID left join airport a on t.airportID = a.airportID join user u on t.userID = u.userID and tripID = ?",
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
};

//prebaciti
exports.postFavoriteTrip = async (req, res) => {
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
};

//prebaciti
exports.deleteFavoriteTrip = async (req, res) => {
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
};

exports.isFavorite = async (req, res) => {
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
};

exports.getFavoriteTrips = async (req, res) => {
  let userid = req.body.user;
  try {
    res.json(
      await new Promise((resolve, reject) => {
        pool.query(
          "SELECT t.tripID, t.city, c.name as country, t.travelDate, t.returnDate, t.price, t.imageSrc FROM trip t join country c where t.countryid = c.countryid and t.tripID in (select tripID from favorite where userID = ?) order by postDate desc",
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
};

exports.postNewInquiry = async (req, res) => {
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
};

exports.postTrip = async (req, res) => {
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
};

exports.updateTrip = async (req, res) => {
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
            req.body.tripID,
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
};

exports.getInquiryTrips = async (req, res, next) => {
  try {
    res.json(
      await new Promise((resolve, reject) => {
        pool.query(
          "SELECT t.tripID, t.city, c.countryID, c.name as countryName, t.travelDate, t.returnDate, t.price, t.imageSrc FROM trip t join country c where t.countryid = c.countryid and t.userID = ? order by postDate desc",
          req.body.userID,
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
};

exports.getAllInquiryTrips = async(req,res,next) => {
  try {
    res.json(
      await new Promise((resolve, reject) => {
        pool.query(
          "SELECT t.tripID, t.city, c.countryID, c.name as countryName, t.travelDate, t.returnDate, t.price, t.imageSrc FROM trip t join country c where t.countryid = c.countryid and t.userID in (select userID from user where role = 'user') order by postDate desc",
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
}
