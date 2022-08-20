const db = require("../db");

const findbyId = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM user_profile WHERE id=$1`,
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
const findByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users WHERE email=$1`, [email], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
const findPhoneNumber = (phone_number) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM user_profile WHERE phone_number=$1`,
      [phone_number],
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
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
const getUserProfile = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM user_profile ORDER BY id DESC`, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const editUsers = (inputfullname, inputemail, id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE users SET fullname=$1, email=$2 WHERE id=$3`,
      [inputfullname, inputemail, id],
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
  inputcredit_card,
  id
) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE user_profile SET fullname= $1, email= $2, phone_number= $3, city= $4, id_place= $5, post_code= $6, credit_card= $7 WHERE id=$8`,
      [
        inputfullname,
        inputemail,
        inputphone_number,
        inputcity,
        inputid_place,
        inputpost_code,
        inputcredit_card,
        id,
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
const editUserRole = (role, id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE user_profile SET role=$1 WHERE id=$2`,
      [role, id],
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

const editUserPhoto = (photo, id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE user_profile SET photo=$1 WHERE id=$2`,
      [photo, id],
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
    db.query(`DELETE FROM users WHERE id=$1`, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
const deleteUserProfile = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM user_profile WHERE id=$1`, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const getbyIdJoin = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM user_profile JOIN place ON user_profile.id_place = place.id_place WHERE id=$1`,
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

module.exports = {
  findbyId,
  findByEmail,
  findPhoneNumber,
  getUsers,
  getUserProfile,
  editUsers,
  editUserProfile,
  editUserRole,
  editUserPhoto,
  deleteUsers,
  deleteUserProfile,
  getbyIdJoin,
};
