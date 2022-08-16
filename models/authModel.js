const db = require("./db");

const findByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM users WHERE email=$1`,
      [email],
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

const register = ( fullname, email, saltPassword ) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO users (fullname, email, password) VALUES ($1, $2, $3)`,
      [ fullname, email, saltPassword ],
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

const registerProfile = ( fullname, email, role, photo ) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO user_profile (fullname, email, role, photo) VALUES ($1, $2, $3, $4)`,
      [ fullname, email, role, photo ],
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

const login = ( fullname, email, role ) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO user_profile (fullname, email, role) VALUES ($1, $2, $3)`,
      [ fullname, email, role ],
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
  findByEmail,
  register,
  registerProfile,
  login,
};
