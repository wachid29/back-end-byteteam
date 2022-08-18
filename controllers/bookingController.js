require("dotenv").config();
const model = require("../models/bookingModel");

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
    const { 
      id_user,
      id_ticket,
      total_passenger,
    } = req.body;
    if(isNaN(id_ticket)){  return res.status(400).send(`id_ticket must be a Number`) };
    if(isNaN(total_passenger)){  return res.status(400).send(`total_passenger must be a Number`) };
    
    // // jika sudah fix, id_user ambil ganti mengambil id dari verify token
    // // id_ticket post an dari front-end

    if(id_user == ''){ return res.status(400).send(`Please input id_user`) };
    // const checkId_user = await model.findId_user(id_user);
    // if(checkId_user == 0){ return res.status(400).send(`Id_user not found`) };

    if(id_ticket == ''){ return res.status(400).send(`Please input id_ticket`) };
    // const checkId_ticket = await model.findId_ticket(id_ticket);
    // if(checkId_ticket == 0){ return res.status(400).send(`Id_ticket not found`) };

    if(total_passenger == ''){ return res.status(400).send(`Please input total_passenger`) };

    // // total_payment, dari ticket.HARGA
    // console.log(checkId_ticket);
    // const total_payment = total_passenger * checkId_ticket.price;
    const total_payment = total_passenger * 1000 * 1000; // hardcode harga/price tiket

    const status_payment = "waiting";

    await model.post( 
      id_user,
      id_ticket,
      total_payment,
      total_passenger,
      status_payment,
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
    const { id_booking, status_payment } = req.body;
    // const id_user = req.tokenUserId;

    if(isNaN(id_booking)){ return res.status(400).send(`id_booking must be a Number`) };
    const getData = await model.findbyId(id_booking);
    if (getData?.rowCount == 0) { return res.status(400).send("data id_booking tidak ditemukan") };

    if(status_payment != 'waiting' && status_payment != 'issue' && status_payment != 'boarding'){ 
      return res.status(400).send(`Input "waiting" or "issue" or "boarding" for status_payment`); 
    }

    await model.statuspayment( status_payment, id_booking );
    res.status(200).send(`status_payment id_booking: ${id_booking} berhasil diubah menjadi ${status_payment}`);

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

module.exports = {
  getall,
  getbyiduser,
  post,
  statuspayment,
  deletebyid,
};