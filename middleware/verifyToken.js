const jwt = require("jsonwebtoken");
require('dotenv').config();

const checkToken = async (req, res, next) => {
  // console.log(req);
  // console.log(req.headers['authorization']);
  jwt.verify(req.headers['authorization'].split(' ')[1], process.env.JWT_KEY, function(err, decoded) {
    if (err) {
      // console.log(err)
      res.status(400).send('Error verify type: ' + err.message + '.');
    } else {
      // console.log(decoded);
      req.tokenUserId = decoded.id;
      req.tokenUserRole = decoded.role;
      next();
    }
  })
};

module.exports = { checkToken };