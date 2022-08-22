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

const addedFacility = (class_flight, facility, logo) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO facilities (class_flight,facility,logo) 
    VALUES ($1,$2,$3)`,
      [class_flight, facility, logo],
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
      `SELECT * FROM facilities WHERE class_flight ~* $1`,
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

const findByID = (id_facility) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM facilities WHERE id_facility= $1`,
      [id_facility],
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

const deletedFacility = (id_facility) => {
  return new Promise((resolve, reject) => {
    db.query(
      `DELETE FROM facilities WHERE id_facility=$1`,
      [id_facility],
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
  findByID,
  deletedFacility,
};
