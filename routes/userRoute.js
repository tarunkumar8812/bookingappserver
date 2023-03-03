const express = require('express');
const router = express.Router()
const { UpdateUser, deleteUser,
    getUser, getAllUsers } = require('../controllers/userController');
// const { verifyToken, verifyUser, verifyAdmin } = require('../utils/verifyToken');

// PUT
// router.put("/:id", verifyUser, UpdateUser)

// // DELETE
// router.delete("/:id", verifyUser, deleteUser)

// // GET single User by id
// router.get("/:id", verifyUser, getUser)

// GET All Users
router.get("/getUser", getAllUsers)

module.exports = router
