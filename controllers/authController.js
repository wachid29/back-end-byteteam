require("dotenv").config();
const model = require("../models/authModel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

// USER REGISTER
const register = async (req, res) => {
  try {
    const { fullname, email, role, password } = req.body;
    // const avatar = "images/users_avatar/defaultAvatar.jpg"; // default image user path
    // console.log(fullname + "~" + email + "~" + role + "~" + password); // untuk cek consolan, sementara
    
    if(email == ''){ return res.status(400).send(`Please input email`) };
    const findEmail = await model.findByEmail(email);
    if(findEmail?.rowCount) { return res.status(400).send("Email has already register, please try antoher email") };
    if(fullname == ''){ return res.status(400).send(`Please input name`) };
    if(password == ''){ return res.status(400).send(`Please input password`) };
    const salt = bcrypt.genSaltSync(5); // generate random string
    // const hash = await bcrypt.hash(password, 5); // bycrypt code ku
    const saltPassword = bcrypt.hashSync(password, salt); // hash password
    // const photo = "images/user_photos/default_user_photo.jpeg";

    if(role == 'admin' || role == 'customer'){ 
      await model.register( fullname, email, saltPassword ); // to users table
      await model.registerProfile( fullname, email, role ); // to user_profile table
      res.status(200).send("Register successfully");
    } else {
      return res.status(400).send(`Input "admin" or "customer" for role user`); 
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("ada yang error di controller register");
  }
};

// USER LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(email == ''){ return res.status(400).send(`Please input email`) };
    if(password == ''){ return res.status(400).send(`Please input password`) };

    const checkauth = await model.findByEmail(email);    
    if(checkauth.rowCount == 0){ return res.status(400).send(`Email didn't valid`) };
    const compare = await bcrypt.compare(password, checkauth.rows[0].password);
    if(compare == false) { return res.status(400).send(`Wrong password !`) };

    const getprofiledata = await model.getprofiledata(email);    
    var token = jwt.sign(
      getprofiledata.rows[0],
      process.env.JWT_KEY,
      { expiresIn: 24 * 60 * 60 }, // EXPIRED TOKEN IN n SECOND
      { algorithm: process.env.JWT_ALG }
    );
    res.status(200).json({
      message: "Login successfully",
      token: token,
    });

  } catch (error) {
    console.log(error);
    res.send("ada yang error di controller login");
  }
};

module.exports = {
  register,
  login,
};
