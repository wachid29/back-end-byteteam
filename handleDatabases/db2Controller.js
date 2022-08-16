require("dotenv").config();
// const cloudinary = require("../middleware/cloudinary");
const model = require("./db3Model");

// SHOW ALL DATA IN USERS TABLE
const getUsers = async (req, res) => {
  try {
    const getData = await model.getUsers();
    res.status(200).json({
      users: getData?.rows.map((e) => {
        return { ...e, password: "protected in API" };
      }),
      datas_count: getData?.rowCount,
    });
  } catch (error) {
    console.log("err", error);
    res.status(400).send("ada yang error");
  }
};

// SHOW ALL DATA IN USER_PROFILE TABLE
const getUserProfile = async (req, res) => {
  try {
    const getData = await model.getUserProfile();
    res.status(200).json({
      user_profile: getData?.rows.map((e) => {
        return { ...e };
      }),
      datas_count: getData?.rowCount,
    });
  } catch (error) {
    console.log("err", error);
    res.status(400).send("ada yang error");
  }
};

// EDIT USERS DATA IN USERS TABLE
const editUser = async (req, res) => {
  try {
    const { 
      id,
      fullname,
      email,
      phone_number,
      city,
      id_place,
      post_code,
      photo,
      credit_card,
      id_user,
    } = req.body;

    if(isNaN(id)){  return res.status(400).send(`Id must be a Number`) };

    const getData = await model.findbyId(id);
    if (getData?.rowCount) {
      let inputfullname = fullname || getData?.rows[0].fullname;
      let inputemail = email || getData?.rows[0].email;
      let inputphone_number = phone_number || getData?.rows[0].phone_number;
      let inputcity = city || getData?.rows[0].city;
      let inputid_place = id_place || getData?.rows[0].id_place;
      let inputpost_code = post_code || getData?.rows[0].post_code;
      let inputphoto = photo || getData?.rows[0].photo;
      let inputcredit_card = credit_card || getData?.rows[0].credit_card;
      let inputid_user = id_user || getData?.rows[0].id_user;

      let message = "";
      if (fullname) message += "fullname, ";
      if (email) message += "email, ";
      if (phone_number) message += "phone_number, ";
      if (city) message += "city, ";
      if (id_place) message += "id_place, ";
      if (post_code) message += "post_code, ";
      if (photo) message += "photo, ";
      if (credit_card) message += "credit_card, ";
      if (id_user) message += "id_user, ";

      await model.editUsers(
        inputfullname,
        inputemail,
        id,
      );

      await model.editUserProfile(
        inputfullname,
        inputemail,
        inputphone_number,
        inputcity,
        inputid_place,
        inputpost_code,
        inputphoto,
        inputcredit_card,
        inputid_user,
        id,
      );

      res.status(200).send(`${message}berhasil di edit`);
    } else {
      res.status(400).send("data tidak ditemukan");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("ada yang error di controller edit user");
  }
};

// EDIT USER ROLE
const editUserRole = async (req, res) => {
  try {
    const { role, id, } = req.body;

    if(isNaN(id)){  return res.status(400).send(`Id must be a Number`) };
    const getData = await model.findbyId(id);

    if(role != 'admin' && role != 'customer'){ 
      return res.status(400).send(`Input "admin" or "customer" for role user`); 
    }

    if (getData?.rowCount) {
      let inputrole = role || getData?.rows[0].role;
      await model.editUserProfile( inputrole, id );
      res.status(200).send(`role user id:${id} berhasil di edit menjadi ${role}`);
    } else {
      res.status(400).send("data tidak ditemukan");
    }

  } catch (error) {
    console.log(error);
    res.status(400).send("ada yang error di controller edit user role");
  }
};

// EDIT USER
const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    const getData = await model.findbyId(id);
    if (getData?.rowCount) {
      await model.deleteUsers(id);
      await model.deleteUserProfile(id);
      res.send(`data id ke-${id} berhasil dihapus`);
    } else {
      res.status(400).send("data tidak ditemukan");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("ada yang error");
  }
};

module.exports = {
  getUsers,
  getUserProfile,
  editUser,
  editUserRole,
  deleteUser,
};