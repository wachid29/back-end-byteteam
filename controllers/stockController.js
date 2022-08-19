const model = require("../models/stockModel");
const ticketModel = require("../models/ticketModel");

const getStock = async (req, res) => {
  try {
    const getData = await model.getAllStock();
    const ticket = await Promise.all(
      getData.rows.map(async (e) => {
        const stock = e.stock <= 0;
        if (!stock) {
          return {
            ...e,
          };
        } else {
          return {
            ...e,
            massage: "tiket habis",
          };
        }
      })
    );
    res.send({ ticket });
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
      res.status(400).send("Stock tidak ditemukan");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("ada yang error");
  }
};

const editStock = async (req, res) => {
  try {
    const { id_ticket, stock } = req.body;

    const getData = await model.findStockIDTicket(id_ticket);
    if (getData?.rowCount) {
      let inputStock = getData?.rows[0].stock - stock || getData?.rows[0].stock;

      let massage = "";
      if (stock) massage += "stock, ";

      const patchData = await model.editedStock(inputStock, id_ticket);
      res.status(200).send(`${massage}berhasil di edit`);
    } else {
      res.status(400).send("Stock tidak ditemukan");
    }
  } catch (error) {
    console.log("err", error);
    res.status(400).send("ada yang error");
  }
};

const deleteStock = async (req, res) => {
  try {
    const { id_stock } = req.query;

    const getData = await model.findStockIDStock(id_stock);
    if (getData?.rowCount) {
      //const { id } = req.body;
      const deleteData = await model.deletedStock(id_stock);
      res.send(`stock id ke-${id_stock} berhasil dihapus`);
    } else {
      res.status(400).send("Stock tidak ditemukan");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("ada yang error");
  }
};

module.exports = {
  getStock,
  addStock,
  editStock,
  deleteStock,
};
