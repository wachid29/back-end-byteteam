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
    res.status(400).send("ada yang error di userController getUsers");
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
    res.status(400).send("ada yang error di userController getUserProfile");
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
      credit_card,
    } = req.body;

    const findEmail = await model.findByEmail(email);
    if (findEmail?.rowCount) {
      return res
        .status(400)
        .send("Email has already register, please try antoher email");
    }
    // if (isNaN(id)) {
    //   return res.status(400).send(`id must be a Number`);
    // }
    // if (isNaN(phone_number)) {
    //   return res.status(400).send(`phone_number must be a Number`);
    // }
    // const findPhoneNumber = await model.findPhoneNumber(phone_number);
    // if (findPhoneNumber?.rowCount) {
    //   return res.status(400).send("Please try another Phone Number");
    // }
    // if (isNaN(post_code)) {
    //   return res.status(400).send(`post_code must be a Number`);
    // }

    const getData = await model.findbyId(id);
    if (getData?.rowCount == 0) {
      return res.status(400).send("data tidak ditemukan");
    }

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

    await model.editUsers(inputfullname, inputemail, id);
    await model.editUserProfile(
      inputfullname,
      inputemail,
      inputphone_number,
      inputcity,
      inputid_place,
      inputpost_code,
      inputcredit_card,
      id
    );

    res.status(200).send(`${message}berhasil di edit`);
  } catch (error) {
    console.log(error);
    res.status(400).send("ada yang error di userController editUser");
  }
};

// EDIT USER ROLE
const editUserRole = async (req, res) => {
  try {
    const { id, role } = req.body;

    if (isNaN(id)) {
      return res.status(400).send(`Id must be a Number`);
    }
    const getData = await model.findbyId(id);
    if (getData?.rowCount == 0) {
      return res.status(400).send("data tidak ditemukan");
    }

    if (role != "admin" && role != "customer") {
      return res.status(400).send(`Input "admin" or "customer" for role user`);
    }
    if (role == getData?.rows[0].role) {
      return res.status(400).send(`You editing to same Role`);
    }

    await model.editUserRole(role, id);

    res.status(200).send(`role user id:${id} berhasil di edit menjadi ${role}`);
  } catch (error) {
    console.log(error);
    res.status(400).send("ada yang error di userController editUserRole");
  }
};

// EDIT USER PHOTO
const editUserPhoto = async (req, res) => {
  try {
    const { id } = req.body;
    if (isNaN(id)) {
      return res.status(400).send(`Id must be a Number`);
    }
    const getData = await model.findbyId(id);
    if ((getData.rowCount = 0)) {
      return res.status(400).send(`No data for user id: ${id}`);
    }

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
    res.status(400).send("ada yang error di userController editUserPhoto");
  }
};

// DELETE USER
const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    const idforconsole = id;
    const getData = await model.findbyId(id);
    if (getData?.rowCount == 0) {
      return res.status(400).send("data tidak ditemukan");
    }
    await model.deleteUsers(id);
    await model.deleteUserProfile(id);

    res.send(`data id ke-${idforconsole} berhasil dihapus`);
  } catch (error) {
    console.log(error);
    res.status(400).send("ada yang error di userController deleteUser");
  }
};

const findUsersByID = async (req, res) => {
  try {
    const { id } = req.query;

    const getData = await model.findbyId(id);
    if (getData?.rowCount) {
      res.status(200).json({
        users: getData?.rows.map((e) => {
          return { ...e, password: "protected in API" };
        }),
        datas_count: getData?.rowCount,
      });
    } else {
      res.status(400).send("user tidak ditemukan");
    }
  } catch (error) {
    console.log("err", error);
    res.status(400).send("ada yang error di userController getUsers");
  }
};
// SHOW ALL DATA IN USER_PROFILE TABLE
const getbyid = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).send(`Id must be a Number`);
    }
    const getData = await model.findbyId(id);
    if (getData?.rowCount == 0) {
      return res.status(400).send("data tidak ditemukan");
    }
    res.status(200).json(getData.rows);
  } catch (error) {
    console.log("err", error);
    res.status(400).send("ada yang error di userController getbyid");
  }
};

module.exports = {
  getUsers,
  getUserProfile,
  editUser,
  editUserRole,
  editUserPhoto,
  deleteUser,
  findUsersByID,
  getbyid,
};
