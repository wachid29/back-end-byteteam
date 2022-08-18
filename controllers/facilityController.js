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
    const { class_flight, facility } = req.body;
    const postData = await model.addedFacility(class_flight, facility);
    res.status(200).send("facility berhasil di tambah");
  } catch (error) {
    console.log(error);
    res.status(400).send("ada yang error");
  }
};

module.exports = {
  getFacility,
  addFacility,
};
