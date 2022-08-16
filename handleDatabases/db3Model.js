const db = require("../models/db");

const findbyId = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM users WHERE id=$1`,
      // `SELECT * FROM user_profile WHERE id=$1`,
      [id],
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

const getUsers = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users ORDER BY id DESC`, (error, result) => {
      if (error) { reject(error) } else { resolve(result) }
    });
  });
};
const getUserProfile = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM user_profile ORDER BY id DESC`, (error, result) => {
      if (error) { reject(error) } else { resolve(result) }
    });
  });
};

const editUsers = ( inputfullname, inputemail, id ) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE users SET fullname=$1, email=$2 WHERE id=$3`,
      [ inputfullname, inputemail, id ],
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
const editUserProfile = (
  inputfullname,
  inputemail,
  inputphone_number,
  inputcity,
  inputid_place,
  inputpost_code,
  inputphoto,
  inputcredit_card,
  inputid_user,
  id
) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE user_profile SET fullname= $1, email= $2, phone_number= $3, city= $4, id_place= $5, post_code= $6, photo= $7, credit_card= $8, id_user= $9 WHERE id=$10`,
      [
        inputfullname,
        inputemail,
        inputphone_number,
        inputcity,
        inputid_place,
        inputpost_code,
        inputphoto,
        inputcredit_card,
        inputid_user,
        id
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
const editUserRole = ( inputrole, id ) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE user_profile SET inputrole=$1 WHERE id=$2`,
      [ inputrole, id ],
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

const deleteUsers = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM users WHERE id=$1`,
      [id],
      (error, result) => {
        if (error) { reject(error) } else { resolve(result); }
      }
    );
  });
};
const deleteUserProfile = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM user_profile WHERE id=$1`,
      [id],
      (error, result) => {
        if (error) { reject(error) } else { resolve(result); }
      }
    );
  });
};

module.exports = {
  findbyId,
  getUsers,
  getUserProfile,
  editUsers,
  editUserProfile,
  editUserRole,
  deleteUsers,
  deleteUserProfile,
};
