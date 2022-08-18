const db = require("../db");
// db get all user
const getAllStock = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM stockticket ORDER BY id_stock DESC`,
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

const addedTicket = (id_ticket, stock) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO stockticket (id_ticket,stock) 
    VALUES ($1,$2)`,
      [id_ticket, stock],
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

const editedStock = (stock, id_ticket) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE stockticket SET stock=$1 WHERE id_ticket=$2`,
      [stock, id_ticket],
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

const findStockIDTicket = (id_ticket) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM stockticket WHERE id_ticket=$1`,
      [id_ticket],
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
  getAllStock,
  addedTicket,
  editedStock,
  findStockIDTicket,
};
