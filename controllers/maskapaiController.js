const model = require("../models/maskapaiModel");

const getMaskapai = async (req, res) => {
  try {
    const getData = await model.getAllMaskapai();
    res.status(200).json({
      maskapai: getData?.rows,
      jumlahData: getData?.rowCount,
    });
  } catch (error) {
    console.log("err", error);
    res.status(400).send("ada yang error");
  }
};

const addMaskapai = async (req, res) => {
  try {
    const { name, logo } = req.body;

    const postData = await model.addedMaskapai(name, logo);
    res.status(200).send("maskapai berhasil di tambah");
  } catch (error) {
    console.log(error);
    res.status(400).send("ada yang error");
  }
};

module.exports = {
  getMaskapai,
  addMaskapai,
};
