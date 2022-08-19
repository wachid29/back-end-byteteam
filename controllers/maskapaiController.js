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

const deleteMaskapai = async (req, res) => {
  try {
    const { id_maskapai } = req.query;

    const getData = await model.findByID(id_maskapai);
    if (getData?.rowCount) {
      //const { id } = req.body;
      const deleteData = await model.deletedMaskapai(id_maskapai);
      res.send(`facility id ke-${id_maskapai} berhasil dihapus`);
    } else {
      res.status(400).send("facility tidak ditemukan");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("ada yang error");
  }
};

module.exports = {
  getMaskapai,
  addMaskapai,
  deleteMaskapai,
};
