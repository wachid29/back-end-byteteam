const model = require("../models/ticketModel");
const placeModel = require("../models/placeModel");
const facilityModel = require("../models/facilityModel");

const getTickets = async (req, res) => {
  try {
    const getData = await model.getAllTicket();
    res.status(200).json({
      ticket: getData?.rows,
      jumlahData: getData?.rowCount,
    });
  } catch (error) {
    console.log("err", error);
    res.status(400).send("ada yang error");
  }
};

const addTicket = async (req, res) => {
  try {
    const {
      id_airplane,
      code_airplane,
      id_from_place,
      from_date,
      from_time,
      from_gate,
      from_terminal,
      id_to_place,
      to_date,
      to_time,
      class_flight,
      price,
    } = req.body;

    const postData = await model.addedTicket(
      id_airplane,
      code_airplane,
      id_from_place,
      from_date,
      from_time,
      from_gate,
      from_terminal,
      id_to_place,
      to_date,
      to_time,
      class_flight,
      price
    );
    res.status(200).send("ticket berhasil di tambah");
  } catch (error) {
    console.log(error);
    res.status(400).send("ada yang error");
  }
};

const deleteTicket = async (req, res) => {
  try {
    const { id_ticket } = req.query;

    const getData = await model.findbyID(id_ticket);
    if (getData?.rowCount) {
      //const { id } = req.body;
      const deleteData = await model.deletedTicket(id_ticket);
      res.send(`ticket id ke-${id_ticket} berhasil dihapus`);
    } else {
      res.status(400).send("ticket tidak ditemukan");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("ada yang error");
  }
};

const findTicket = async (req, res) => {
  //cari berdasarkan name
  try {
    const { id_ticket } = req.query;
    const getData = await model.findbyID(id_ticket);
    if (getData?.rowCount) {
      const ticket = await Promise.all(
        getData.rows.map(async (e) => {
          const place1 = await placeModel.findByID(e.id_from_place);
          const place2 = await placeModel.findByID(e.id_to_place);
          const facility = await facilityModel.findByClass(e.class_flight);
          return {
            ...e,
            place1: place1?.rows,
            place2: place2?.rows,
            facility: facility?.rows,
          };
        })
      );
      res.send({ ticket });
    } else {
      res.status(400).send("data tidak ditemukan");
    }
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};

const findTicket2 = async (req, res) => {
  //cari berdasarkan name
  try {
    const { id_from_place, id_to_place, class_flight, from_date } = req.query;
    const getData = await model.findTicket(
      id_from_place,
      id_to_place,
      class_flight,
      from_date
    );
    if (getData?.rowCount) {
      const ticket = await Promise.all(
        getData.rows.map(async (e) => {
          const place1 = await placeModel.findByID(e.id_from_place);
          const place2 = await placeModel.findByID(e.id_to_place);
          const facility = await facilityModel.findByClass(e.class_flight);

          return {
            ...e,
            place1: place1?.rows,
            place2: place2?.rows,
            facility: facility?.rows,
          };
        })
      );
      res.send({ ticket });
    } else {
      res.status(400).send("data tidak ditemukan");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("ada yang error");
  }
};

module.exports = {
  getTickets,
  addTicket,
  deleteTicket,
  findTicket,
  findTicket2,
};
