const db = require("../db");

// db get all user
const getAllUSer = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM registeruser ORDER BY id DESC`, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const findByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM registeruser WHERE email=$1`,
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

const addedUser = (fixname, fixemail, fixphone_number, fixPassword) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO registeruser (name, email, phone_number, password) 
    VALUES ($1,$2,$3,$4)`,
      [fixname, fixemail, fixphone_number, fixPassword],
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

const findbyID = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM registeruser WHERE id=$1`,
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

const editedPhoto = (foto, id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE registeruser SET user_photo=$1 WHERE id=$2`,
      [foto, id],
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

const editedUser = (
  inputName,
  inputEmail,
  inputPhone,
  inputRole,
  inputIs_hired,
  id
) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE registeruser SET name= $1, email=$2, phone_number=$3, role=$4, is_hired=$5 WHERE id=$6`,
      [inputName, inputEmail, inputPhone, inputRole, inputIs_hired, id],
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

const deletedUser = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM registeruser WHERE id=$1`, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const updateDetailUser = (props) => {
  const {
    id,
    changeJobTitle,
    changeAddress,
    changeJob_type,
    changeDescription,
    changeWorkPlace,
  } = props;
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE registeruser SET job_title = $1, address = $2, job_type= $3, description = $4, workplace = $5 WHERE id = $6`,
      [
        changeJobTitle,
        changeAddress,
        changeJob_type,
        changeDescription,
        changeWorkPlace,
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

const getDataByName = (name) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM registeruser WHERE name ~* $1 ORDER BY id DESC`,
      [name],
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

const getDataByAddress = (address) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM registeruser WHERE address ~* $1 ORDER BY id DESC`,
      [address],
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

const getDataSkill = (skill) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM skill JOIN registeruser ON skill.id_user = registeruser.id WHERE skill = $1 ORDER BY registeruser.id DESC`,
      [skill],
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

const getDataByJobtitle = (job_title) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM registeruser WHERE job_title ~* $1 ORDER BY id DESC`,
      [job_title],
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
  getAllUSer,
  findByEmail,
  addedUser,
  findbyID,
  editedPhoto,
  deletedUser,
  editedUser,
  updateDetailUser,
  getDataByName,
  getDataByAddress,
  getDataSkill,
  getDataByJobtitle,
};
