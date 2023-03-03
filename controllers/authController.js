const User = require('../models/userModel.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function register(req, res, next) {

    try {

        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(req.body.password, salt)




        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
        })

        if (!newUser) { return res.status(400).send({ status: false, message: "user not created" }); }


        return res.status(201).send({ status: true, data: newUser, message: "User Created successfully" });

    } catch (err) {
        next(err)
    }

}



async function login(req, res, next) {

    try {


        const user = await User.findOne({ username: req.body.username })

        if (!user) { return res.status(404).send({ status: false, message: "user not found" }); }

        // const isCorrectPass = await bcrypt.compare(req.body.password, user.password);

        // if (!isCorrectPass) { return res.status(403).send({ status: false, message: "wrong pasword or username" }); }

        //createing JWT Token
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT || "thisfasfkjsdnksajflajkfhsnafvsalsa")


        const { password, isAdmin, ...otherDetails } = user._doc


        //sending JWT Token
        return res
            .cookie("access_token", token, { httpOnly: true })
            .status(200)
            .send({ status: true, data: otherDetails });

    } catch (err) {
        next(err)
    }

}


module.exports = { register, login }