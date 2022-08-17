require("dotenv").config();
const cloudinary = require("../middleware/cloudinary");
const model = require("../models/userModel");

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
      fullname,
      email,
      phone_number,
      city,
      id_place,
      post_code,
      credit_card,
    } = req.body;
    const id_user = req.tokenUserId;

    if(isNaN(id_user)){  return res.status(400).send(`Id must be a Number`) };

    const getData = await model.findbyId(id_user);
    if (getData?.rowCount) {
      let inputfullname = fullname || getData?.rows[0].fullname;
      let inputemail = email || getData?.rows[0].email;
      let inputphone_number = phone_number || getData?.rows[0].phone_number;
      let inputcity = city || getData?.rows[0].city;
      let inputid_place = id_place || getData?.rows[0].id_place;
      let inputpost_code = post_code || getData?.rows[0].post_code;
      let inputcredit_card = credit_card || getData?.rows[0].credit_card;

      let message = "";
      if (fullname) message += "fullname, ";
      if (email) message += "email, ";
      if (phone_number) message += "phone_number, ";
      if (city) message += "city, ";
      if (id_place) message += "id_place, ";
      if (post_code) message += "post_code, ";
      if (credit_card) message += "credit_card, ";

      await model.editUsers(
        inputfullname,
        inputemail,
        id_user,
      );

      await model.editUserProfile(
        inputfullname,
        inputemail,
        inputphone_number,
        inputcity,
        inputid_place,
        inputpost_code,
        inputcredit_card,
        id_user,
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
    const { role } = req.body;
    const id_user = req.tokenUserId;

    if(isNaN(id_user)){ return res.status(400).send(`Id must be a Number`) };
    const getData = await model.findbyId(id_user);

    if(role != 'admin' && role != 'customer'){ 
      return res.status(400).send(`Input "admin" or "customer" for role user`); 
    }

    if (getData?.rowCount) {
      let inputrole = role || getData?.rows[0].role;
      await model.editUserProfile( inputrole, id_user );
      res.status(200).send(`role user id:${id_user} berhasil di edit menjadi ${role}`);
    } else {
      res.status(400).send("data tidak ditemukan");
    }

  } catch (error) {
    console.log(error);
    res.status(400).send("ada yang error di controller edit user role");
  }
};

// EDIT USER PHOTO
const editUserPhoto = async (req, res) => {
  try {
    const id = req.tokenUserId;
    if(isNaN(id)){ return res.status(400).send(`Id must be a Number`) };
    const getData = await model.findbyId(id);
    if(getData.rowCount = 0){ return res.status(400).send(`No data for user id: ${id}`) };

    if (req?.file) {
      const uploadImage =
      (await cloudinary.uploader.upload(req?.file?.path, {
        folder: "user_photo",
      })) || null;
      
      const photo = uploadImage.secure_url;
      await model.editUserPhoto(photo, id);
      res.status(200).send(`Edit photo user id:${id}, Success`);

    } else {
      res.status(400).send("data tidak ditemukan");
    }

  } catch (error) {
    console.log(error);
    res.status(400).send("ada yang error di controller edit user role");
  }
};

// DELETE USER
const deleteUser = async (req, res) => {
  try {
    const id_user = req.tokenUserId;
    const id = id_user;
    const getData = await model.findbyId(id);
    if (getData?.rowCount) {
      await model.deleteUsers(id_user);
      await model.deleteUserProfile(id_user);
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
  editUserPhoto,
  deleteUser,
};