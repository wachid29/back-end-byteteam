const db = require("../db");

// db get all user
const getAllTicket = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM newticket ORDER BY newticket.id_ticket DESC`,
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

const addedTicket = (
  id_airplane,
  code_airplane,
  id_from_place,
  from_date,
  from_time,
  from_gate,
  from_terminal,
  id_to_place,
  to_date,
  to_time,
  class_flight,
  price
) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO newticket (id_airplane,code_airplane,id_from_place,from_date,from_time,from_gate,from_terminal,id_to_place,to_date,to_time,class_flight,price) 
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
      [
        id_airplane,
        code_airplane,
        id_from_place,
        from_date,
        from_time,
        from_gate,
        from_terminal,
        id_to_place,
        to_date,
        to_time,
        class_flight,
        price,
      ],
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

const deletedTicket = (id_ticket) => {
  return new Promise((resolve, reject) => {
    db.query(
      `DELETE FROM newticket WHERE id_ticket=$1`,
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

const findbyID = (id_ticket) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM newticket JOIN maskapai ON newticket.id_airplane = maskapai.id_maskapai WHERE id_ticket=$1`,
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

const findTicket = (id_from_place, id_to_place, class_flight, from_date) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM newticket JOIN maskapai ON newticket.id_airplane = maskapai.id_maskapai JOIN stockticket ON newticket.id_ticket = stockticket.id_ticket WHERE id_from_place = $1 AND id_to_place = $2 AND class_flight =$3 AND from_date =$4 AND stock > 0`,
      [id_from_place, id_to_place, class_flight, from_date],
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
  getAllTicket,
  addedTicket,
  deletedTicket,
  findbyID,
  findTicket,
};
