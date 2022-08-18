require("dotenv").config();
const model = require("../models/bookingModel");
const stockModel = require("../models/stockModel");

// SHOW ALL DATA IN USERS TABLE
const getall = async (req, res) => {
  try {
    const getData = await model.getall();
    res.status(200).json({
      users: getData?.rows.map((e) => e),
      datas_count: getData?.rowCount,
    });
  } catch (error) {
    console.log("err", error);
    res.status(400).send("ada yang error di bookingController getall");
  }
};

// SHOW DATA BY ID USER
const getbyiduser = async (req, res) => {
  try {
    const { id_user } = req.body;
    const getData = await model.findId_user(id_user);
    res.status(200).json({
      users: getData?.rows.map((e) => e),
      datas_count: getData?.rowCount,
    });
  } catch (error) {
    console.log("err", error);
    res.status(400).send("ada yang error di bookingController getbyiduser");
  }
};

// POST DATA TO BOOKINGS TABLE BY ID_BOOKING
const post = async (req, res) => {
  try {
    // Validation, just role 'customer' can Access.
    const user_role = req.tokenUserRole;
    if (user_role != "customer") {
      return res.status(400).send(`Can't access, your id role is 'admin'`);
    }

    const id_user = req.tokenUserId;
    if (id_user == "") {
      return res.status(400).send(`Please input id_user`);
    }
    const checkId_user = await model.findId_user(id_user);
    if (checkId_user == 0) {
      return res.status(400).send(`Id_user not found`);
    }

    const { id_ticket, total_passenger, total_payment } = req.body;

    if (id_ticket == "") {
      return res.status(400).send(`Please input id_ticket`);
    }
    if (isNaN(id_ticket)) {
      return res.status(400).send(`id_ticket must be a Number`);
    }
    const checkId_ticket = await model.findId_ticket(id_ticket);
    if (checkId_ticket == 0) {
      return res.status(400).send(`Id_ticket not found`);
    }

    if (total_passenger == "") {
      return res.status(400).send(`Please input total_passenger`);
    }
    if (isNaN(total_passenger)) {
      return res.status(400).send(`total_passenger must be a Number`);
    }

    if (isNaN(total_payment)) {
      return res
        .status(400)
        .send(`total_payment must be Input and data-type Number`);
    }

    const status_payment = "waiting";

    // total payment dari pronent, ubah controller dan model

    await model.post(
      id_user,
      id_ticket,
      total_payment,
      total_passenger,
      status_payment
    );

    res.status(200).json({
      id_user: id_user,
      id_ticket: id_ticket,
      total_payment: total_payment,
      total_passenger: total_passenger,
      status_payment: status_payment,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("ada yang error di bookingController post");
  }
};

// EDIT STATUS PAYMENT
const statuspayment = async (req, res) => {
  try {
    // Validation, just role 'admin' can Access.
    const user_role = req.tokenUserRole;
    if (user_role != "admin") {
      return res.status(400).send(`Can't access, your id role is 'customer'`);
    }

    const { id_booking, status_payment } = req.body;

    if (isNaN(id_booking)) {
      return res.status(400).send(`id_booking must be a Number`);
    }
    const getData = await model.findbyId(id_booking);
    if (getData?.rowCount == 0) {
      return res.status(400).send("data id_booking tidak ditemukan");
    }

    if (
      status_payment != "waiting" &&
      status_payment != "issue" &&
      status_payment != "boarding"
    ) {
      return res
        .status(400)
        .send(`Input "waiting" or "issue" or "boarding" for status_payment`);
    }

    await model.statuspayment(status_payment, id_booking);
    res
      .status(200)
      .send(
        `status_payment id_booking: ${id_booking} berhasil diubah menjadi ${status_payment}`
      );
  } catch (error) {
    console.log(error);
    res.status(400).send("ada yang error di bookingController statuspayment");
  }
};

// DELETE BOOKING BY ID_BOOKING
const deletebyid = async (req, res) => {
  try {
    const { id_booking } = req.body;
    // const id_user = req.tokenUserId;
    const id = id_booking;
    const getData = await model.findbyId(id_booking);
    if (getData?.rowCount) {
      await model.deletebyid(id_booking);
      res.send(`data id_booking ke-${id} berhasil dihapus`);
    } else {
      res.status(400).send("data tidak ditemukan");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("ada yang error di bookingController deletebyid");
  }
};

const statuspaymentV2 = async (req, res) => {
  try {
    const { id_booking, status_payment } = req.body;
    // const id_user = req.tokenUserId;

    if (isNaN(id_booking)) {
      return res.status(400).send(`id_booking must be a Number`);
    }
    const getData = await model.findbyId(id_booking);

    if (
      status_payment != "waiting" &&
      status_payment != "issue" &&
      status_payment != "boarding"
    ) {
      return res
        .status(400)
        .send(`Input "waiting" or "issue" or "boarding" for status_payment`);
    }

    if (getData?.rows[0].status_payment === "waiting") {
      if (status_payment != "issue") {
        return res.status(400).send(`Status_payment not edited`);
      }
    }

    if (getData?.rows[0].status_payment === "issue") {
      if (status_payment != "boarding") {
        return res.status(400).send(`Status_payment not edited`);
      }
    }

    if (getData?.rows[0].status_payment === "boarding") {
      return res.status(400).send(`Status_payment not edited`);
    }

    const patchData = await model.statuspayment(status_payment, id_booking);
    const getAgain = await model.findbyIdAndStatus(id_booking, "issue");

    if (getAgain?.rowCount) {
      const editStok = await Promise.all(
        getAgain.rows.map(async (e) => {
          const id_ticket = e.id_ticket;
          const stock = e.total_passenger;
          const getStock = await stockModel.findStockIDTicket(id_ticket);
          if (getStock?.rowCount) {
            let inputStock = getStock?.rows[0].stock - stock;
            const patchData = await stockModel.editedStock(
              inputStock,
              id_ticket
            );
          } else {
            res.status(400).send("data tidak ditemukan");
          }
        })
      );
    }
    if (status_payment == "issue") {
      res
        .status(200)
        .send(
          `status_payment berhasil diubah menjadi ${status_payment}, stock tiket berkurang`
        );
    } else {
      res
        .status(200)
        .send(`status_payment berhasil diubah menjadi ${status_payment}`);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("ada yang error di bookingController statuspayment");
  }
};

module.exports = {
  getall,
  getbyiduser,
  post,
  statuspayment,
  deletebyid,
  statuspaymentV2,
};
