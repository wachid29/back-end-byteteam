const db = require("../db");

const findbyId = (id_booking) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM bookings WHERE id_booking=$1`,
      [id_booking],
      (error, result) => { if (error) { reject(error) } else { resolve(result) } }
    );
  });
};
const findId_user = (id_user) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM bookings WHERE id_user=$1 ORDER BY id_booking DESC`,
      [id_user],
      (error, result) => { if (error) { reject(error) } else { resolve(result) } }
    );
  });
};
const findId_ticket = (id_ticket) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM tickets WHERE id=$1`,
      [id_ticket],
      (error, result) => { if (error) { reject(error) } else { resolve(result) } }
    );
  });
};

const getall = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM bookings ORDER BY id_booking DESC`, 
      (error, result) => { if (error) { reject(error) } else { resolve(result) } }
    );
  });
};

const post = ( 
  id_user,
  id_ticket,
  total_payment,
  total_passenger,
  status_payment, 
  ) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO bookings ( id_user, id_ticket, total_payment, total_passenger, status_payment ) VALUES ($1, $2, $3, $4, $5)`,
      [ 
        id_user,
        id_ticket,
        total_payment,
        total_passenger,
        status_payment,
      ],
      (error, result) => { if (error) { reject(error) } else { resolve(result) } }
    );
  });
};

const statuspayment = ( status_payment, id_booking ) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE bookings SET status_payment=$1 WHERE id_booking=$2`,
      [ status_payment, id_booking ],
      (error, result) => { if (error) { reject(error) } else { resolve(result) } }
    );
  });
};

const deletebyid = (id_booking) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM bookings WHERE id_booking=$1`,
      [id_booking],
      (error, result) => { if (error) { reject(error) } else { resolve(result) } }
    );
  });
};

module.exports = {
  findbyId,
  findId_user,
  findId_ticket,
  getall,
  post,
  statuspayment,
  deletebyid,
};
