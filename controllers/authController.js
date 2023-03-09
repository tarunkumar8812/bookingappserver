const User = require('../models/userModel.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

async function register(req, res, next) {

    try {


        let { name, email, phone, password } = req.body

        // let errors = []
        //-----------all validations for fileds -----------
        // validUserName(fname, errors)
        // validEmail(email, errors)
        // validPassword(password, errors)
        // validPhone(phone, errors)


        // if (errors.length > 0) { console.log(`( ${errors} )`) }
        // if (errors.length > 0) { return res.status(400).send({ status: false, message: `( ${errors} )` }); }


        //  ---------checking uniqueness of email ---------

        let emailInDb = await User.findOne({ email })
        if (emailInDb) return res.status(409).send({ status: false, message: "Email is already registered!" })


        //  ------- checking uniqueness of phone no. -------
        let phoneInDb = await User.findOne({ phone })
        if (phoneInDb) return res.status(409).send({ status: false, message: "Phone no. is already registered!" })


        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password, salt)


        const newUser = await User.create({
            username: name,
            email: email,
            phone: phone,
            password: hashPassword,
        })

        if (!newUser) { return res.status(503).send({ status: false, message: "Registration failed! Service Unavailable" }); }


        return res.status(201).send({ status: true, data: newUser, message: "User Created successfully" });

    } catch (err) {
        next(err)
    }

}



async function login(req, res, next) {

    try {
        console.log(req.body);

        // finding user in database by emailId
        const user = await User.findOne({ email: req.body.username })

        if (!user) { return res.status(404).send({ status: false, message: "User not found!" }); }


        // matching hashed password using Bcrypt
        const isCorrectPass = await bcrypt.compare(req.body.password, user.password);

        if (!isCorrectPass) { return res.status(403).send({ status: false, message: "Wrong email or password!" }); }

        //creating JWT Token
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT || "thisfasfkjsdnksajflajkfhsnafvsalsa")


        const { password, isAdmin, ...otherDetails } = user._doc


        //sending JWT Token
        return res
            .cookie("access_token", token, { httpOnly: true })
            .status(200)
            .send({ status: true, message: "Login successful", data: otherDetails });

    } catch (err) {
        next(err)
    }

}


module.exports = { register, login }