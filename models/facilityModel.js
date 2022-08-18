const db = require("../db");
// db get all user
const getAllFacility = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM facilities ORDER BY id_facility DESC`,
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

const addedFacility = (class_flight, facility) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO facilities (class_flight,facility) 
    VALUES ($1,$2)`,
      [class_flight, facility],
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

const findByClass = (class_flight) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM facilities WHERE class_flight = $1`,
      [class_flight],
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
  getAllFacility,
  addedFacility,
  findByClass,
};
