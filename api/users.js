const express = require("express");
const pool = require("../db/index");
const routes = express.Router();

routes.get("/", async (req, res) => {
  try {
    res.json(
      await new Promise((resolve, reject) => {
        pool.query("select * from user", (err, results) => {
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

routes.get("/id/:id", async (req, res) => {
  let id = req.params.id;
  try {
    res.json(
      await new Promise((resolve, reject) => {
        pool.query(
          "select * from user where userid = ?",
          id,
          (err, results) => {
            if (err) {
              return reject(err);
            } else {
              return resolve(results);
              //return {opis: 'Nema rezultata'};
            }
          }
        );
      })
    );
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
  //res.json(members.filter(member => member.id === parseInt(req.params.id)));
});

routes.post("/signin", async (req, res) => {
  try {
    res.json(
      await new Promise((resolve, reject) => {
        pool.query(
          "select * from user where email = ? and password = ?",
          [req.body.email, req.body.password],
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

routes.post("/signup", async (req, res) => {
  try {
    res.json(
      await new Promise((resolve, reject) => {
        pool.query(
          "insert into user (firstName, lastName, email, password, dateOfBirth, role) values (?,?,?,?,?,'user')",
          [
            req.body.firstName,
            req.body.lastName,
            req.body.email,
            req.body.password,
            req.body.dateOfBirth.toString().split("T")[0],
          ],
          (err, results) => {
            if (err) {
              return reject(err);
            } else {
              pool.query(
                "select * from user where email = ?",
                req.body.email,
                (err, results) => {
                  if (err) {
                    return reject(err);
                  } else {
                    return resolve(results);
                  }
                }
              );
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
