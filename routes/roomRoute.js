const express = require('express')
const router = express.Router()
const { verifyAdmin } = require("../utils/verifyToken.js");

const { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailability, } = require("../controllers/roomController.js")

//CREATE
router.post("/:hotelid", createRoom);

//UPDATE
router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", verifyAdmin, updateRoom);

router.put("/:id", verifyAdmin, updateRoom);

//DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

//GET
router.get("/:id", getRoom);

//GET ALL
router.get("/", getRooms);

module.exports = router
