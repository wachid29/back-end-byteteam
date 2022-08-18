const model = require("../models/stockModel");
const ticketModel = require("../models/ticketModel");

const getStock = async (req, res) => {
  try {
    const getData = await model.getAllStock();
    res.status(200).json({
      stock: getData?.rows,
      jumlahData: getData?.rowCount,
    });
  } catch (error) {
    console.log("err", error);
    res.status(400).send("ada yang error");
  }
};

const addStock = async (req, res) => {
  try {
    const { id_ticket, stock } = req.body;
    const getData = await ticketModel.findbyID(id_ticket);
    if (getData?.rowCount) {
      const postData = await model.addedTicket(id_ticket, stock);
      res.status(200).send("stock berhasil di tambah");
    } else {
      res.status(400).send("ticket tidak ditemukan");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("ada yang error");
  }
};

module.exports = {
  getStock,
  addStock,
};
