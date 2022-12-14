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

module.exports = {
  getAllMaskapai,
  addedMaskapai,
};
