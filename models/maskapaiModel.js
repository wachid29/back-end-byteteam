const db = require("../db");
// db get all user
const getAllMaskapai = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM maskapai ORDER BY id_maskapai DESC`,
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

const addedMaskapai = (name, logo) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO maskapai (name,logo) 
    VALUES ($1,$2)`,
      [name, logo],
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

const findByID = (id_maskapai) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM maskapai WHERE id_maskapai= $1`,
      [id_maskapai],
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

const deletedMaskapai = (id_maskapai) => {
  return new Promise((resolve, reject) => {
    db.query(
      `DELETE FROM maskapai WHERE id_maskapai=$1`,
      [id_maskapai],
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
  getAllMaskapai,
  addedMaskapai,
  findByID,
  deletedMaskapai,
};
