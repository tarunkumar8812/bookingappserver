const express = require('express')
const {
    creteHotel, UpdateHotel, deleteHotel, getHotel, getAllHotels, getHotelRooms,
    countByCity, countByType } = require('../controllers/hotelController.js')
const { verifyAdmin } = require("../utils/verifyToken.js")
const router = express.Router()

// CREATE
router.post("/", verifyAdmin, creteHotel)

// PUT
router.put("/:id", verifyAdmin, UpdateHotel)

// DELETE
router.delete("/find/:id", verifyAdmin, deleteHotel)

// GET single hotel by id
router.get("/:id", getHotel)

// GET All Hotels
router.get("/", getAllHotels)


router.get("/room/:id", getHotelRooms);


// router.get("/countByCity", countByCity);
router.get("/ab/countByCity", countByCity);


router.get("/ab/countByType", countByType);


module.exports = router

