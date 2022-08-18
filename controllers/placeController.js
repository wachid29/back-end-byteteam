const model = require("../models/placeModel");

const getPlaces = async (req, res) => {
  try {
    const getData = await model.getAllPlace();
    res.status(200).json({
      place: getData?.rows,
      jumlahData: getData?.rowCount,
    });
  } catch (error) {
    console.log("err", error);
    res.status(400).send("ada yang error");
  }
};

const addPlace = async (req, res) => {
  try {
    const { city, country, city_code, city_picture } = req.body;

    const postData = await model.addedPlace(
      city,
      country,
      city_code,
      city_picture
    );
    res.status(200).send("place berhasil di tambah");
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};

const findByCity = async (req, res) => {
  //cari berdasarkan name
  try {
    const { city } = req.query;
    const getData = await model.findByCity(city);
    if (getData?.rowCount) {
      res.status(200).json({
        place: getData?.rows,
        jumlahData: getData?.rowCount,
      });
    } else {
      res.status(400).send("data tidak ditemukan");
    }
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};

module.exports = {
  getPlaces,
  addPlace,
  findByCity,
};
