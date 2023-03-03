const User = require('../models/userModel.js')

async function UpdateUser(req, res, next) {

    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, { $set: { username: req.body.username } }, { new: true })
        return res.status(200).send({ status: true, data: updateUser });
    } catch (err) {
        next(err)
    }

}

async function deleteUser(req, res, next) {
    try {
        const isDeleted = await User.findByIdAndDelete(req.params.id)

        if (!isDeleted) { return res.status(404).send({ status: false, message: "data not found" }); }

        return res.status(200).send({ status: true, message: "User is deleted" });
    } catch (err) {
        next(err)
    }

}


async function getUser(req, res, next) {

    try {

        const user = await User.findById(req.params.id)

        if (!user) { return res.status(404).send({ status: false, message: "data not found" }); }

        return res.status(200).send({ status: true, data: user });

    } catch (err) {
        next(err)
    }

}


async function getAllUsers(req, res, next) {

    try {
        const allUsers = await User.find()


        if (!allUsers) { return res.status(404).json({ status: false, message: "data not found" }); }

        return res.status(200).json({ status: true, counts: allUsers.length, data: allUsers });

    } catch (err) {
        next(err)
    }

}


module.exports = { UpdateUser, deleteUser, getUser, getAllUsers }