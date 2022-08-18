const db = require("../db");

// db get all user
const getAllPlace = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM place ORDER BY id_place DESC`, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const addedPlace = (city, country, city_code, city_picture) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO place (city,country,city_code,city_picture) 
    VALUES ($1,$2,$3,$4)`,
      [city, country, city_code, city_picture],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const findByCity = (city) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM place WHERE city ~* $1`,
      [city],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

module.exports = {
  getAllPlace,
  addedPlace,
  findByCity,
};
