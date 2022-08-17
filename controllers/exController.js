const cloudinary = require("../middleware/cloudinary");
const model = require("../models/exModel");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const getUsers = async (req, res) => {
  try {
    const getData = await model.getAllUSer();
    res.status(200).json({
      user: getData?.rows.map((e) => {
        return { ...e, password: null };
      }),
      jumlahData: getData?.rowCount,
    });
  } catch (error) {
    console.log("err", error);
    res.status(400).send("ada yang error");
  }
};

const addUsers = async (req, res) => {
  try {
    const { name, email, phone_number, password, confirm_pass } = req.body;

    const fixname = name.trim();
    const fixemail = email.trim();
    const fixphone_number = phone_number.trim();

    const findEmail = await model.findByEmail(fixemail);

    if (findEmail?.rowCount) {
      res.status(400).send("email sudah terdaftar");
    } else {
      if (password === confirm_pass) {
        const salt = bcrypt.genSaltSync(5); // generate random string
        const fixPassword = bcrypt.hashSync(password, salt); // hash password

        const postData = await model.addedUser(
          fixname,
          fixemail,
          fixphone_number,
          fixPassword
        );
        res.status(200).send("data berhasil di tambah");
      } else {
        res.status(400).send("password dan confirm password tidak sesuai");
      }
    }
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};

const editPhoto = async (req, res) => {
  try {
    const { id } = req.body;

    const findbyID = await model.findbyID(id);
    if (findbyID?.rowCount) {
      if (req?.file) {
        const uploadImage =
          (await cloudinary.uploader.upload(req?.file?.path, {
            folder: "user_photo",
          })) || null;

        const { id } = req.body;
        const foto = uploadImage.secure_url;
        const editedPhoto = await model.editedPhoto(foto, id);

        res.status(200).send("photo profile berhasil di edit");
      } else {
        res.status(200).send("photo profile tidak di edit");
      }
    } else {
      res.status(400).send("id belum terdaftar");
    }
  } catch (error) {
    console.log("err", error);
    res.status(400).send("ada yang error");
  }
};

const findUserByID = async (req, res) => {
  //cari berdasarkan name
  try {
    const { id } = req.query;
    const getData = await model.findbyID(id);
    if (getData?.rowCount) {
      res.status(200).json({
        user: getData?.rows.map((e) => {
          return { ...e, password: null };
        }),
        jumlahData: getData?.rowCount,
      });
    } else {
      res.status(400).send("data tidak ditemukan");
    }
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};

const findUserByEmail = async (req, res) => {
  //cari berdasarkan name
  try {
    const { email } = req.query;
    const getData = await model.findByEmail(email);
    if (getData?.rowCount) {
      res.status(200).json({
        user: getData?.rows.map((e) => {
          return { ...e, password: null };
        }),
        jumlahData: getData?.rowCount,
      });
    } else {
      res.status(400).send("data tidak ditemukan");
    }
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.query;

    const getData = await model.findbyID(id);
    if (getData?.rowCount) {
      //const { id } = req.body;
      const deleteData = await model.deletedUser(id);
      res.send(`data id ke-${id} berhasil dihapus`);
    } else {
      res.status(400).send("data tidak ditemukan");
    }
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};

const editUser = async (req, res) => {
  try {
    const { email } = req.body;

    const findEmail = await model.findByEmail(email);
    if (findEmail?.rowCount) {
      res.status(400).send("email sudah terdaftar");
    } else {
      const { id, name, email, phone_number, role, is_hired } = req.body;

      const getData = await model.findbyID(id);
      if (getData?.rowCount) {
        let inputName = name || getData?.rows[0].name;
        let inputEmail = email || getData?.rows[0].email;
        let inputPhone = phone_number || getData?.rows[0].phone_number;
        let inputRole = role || getData?.rows[0].role;
        let inputIs_hired = is_hired || getData?.rows[0].is_hired;

        let massage = "";
        if (name) massage += "name, ";
        if (email) massage += "email, ";
        if (phone_number) massage += "phone_number, ";
        if (role) massage += "role, ";
        if (is_hired) massage += "is_hired, ";

        const patchData = await model.editedUser(
          inputName,
          inputEmail,
          inputPhone,
          inputRole,
          inputIs_hired,
          id
        );
        res.status(200).send(`${massage}berhasil di edit`);
      } else {
        res.status(400).send("data tidak ditemukan");
      }
    }
  } catch (error) {
    console.log("err", error);
    //console.log(fixname, fixemail, fixphone_number);
    res.status(400).send("ada yang error");
  }
};

const updateDetailUser = async (req, res) => {
  try {
    const { id, job_title, address, job_type, description, workplace } =
      req.body;
    const getData = await model.findbyID(id);
    if (getData?.rowCount) {
      let changeJobTitle = job_title || getData.rows[0].job_title;
      let changeAddress = address || getData.rows[0].address;
      let changeJob_type = job_type || getData.rows[0].job_type;
      let changeDescription = description || getData.rows[0].description;
      let changeWorkPlace = workplace || getData.rows[0].workplace;

      await model.updateDetailUser({
        id,
        changeJobTitle,
        changeAddress,
        changeJob_type,
        changeDescription,
        changeWorkPlace,
      });
      res.send({
        msg: `Detail data dengan user id ${id} telah diperbarui!`,
        data: {
          id,
          job_title: changeJobTitle,
          address: changeAddress,
          job_type: changeJob_type,
          description: changeDescription,
          workplace: changeWorkPlace,
        },
      });
    } else {
      res.status(400).send("data tidak ditemukan");
    }
  } catch (error) {
    console.log("err", error);
    res.status(400).send("ada yang error");
  }
};

module.exports = {
  getUsers,
  addUsers,
  editPhoto,
  findUserByID,
  findUserByEmail,
  deleteUser,
  editUser,
  updateDetailUser,
};
