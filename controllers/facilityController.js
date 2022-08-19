const model = require("../models/facilityModel");

const getFacility = async (req, res) => {
  try {
    const getData = await model.getAllFacility();
    res.status(200).json({
      facility: getData?.rows,
      jumlahData: getData?.rowCount,
    });
  } catch (error) {
    console.log("err", error);
    res.status(400).send("ada yang error");
  }
};

const addFacility = async (req, res) => {
  try {
    const { class_flight, facility, logo } = req.body;
    const postData = await model.addedFacility(class_flight, facility, logo);
    res.status(200).send("facility berhasil di tambah");
  } catch (error) {
    console.log(error);
    res.status(400).send("ada yang error");
  }
};

const deleteFacility = async (req, res) => {
  try {
    const { id_facility } = req.query;

    const getData = await model.findByID(id_facility);
    if (getData?.rowCount) {
      //const { id } = req.body;
      const deleteData = await model.deletedFacility(id_facility);
      res.send(`facility id ke-${id_facility} berhasil dihapus`);
    } else {
      res.status(400).send("facility tidak ditemukan");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("ada yang error");
  }
};

module.exports = {
  getFacility,
  addFacility,
  deleteFacility,
};
