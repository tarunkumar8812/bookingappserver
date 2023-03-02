const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
// const authRoute = require('./routes/authRoute.js')
// const usersRoute = require('./routes/usersRoute.js')
// const hotelsRoute = require('./routes/hotelsRoute.js')
// const roomsRoute = require('./routes/roomsRoute.js')
const cookieParser = require('cookie-parser')
require("dotenv").config()

const app = express()

app.use(cors())
// is global middleware
app.use(cookieParser())
app.use(express.json())

// error handling middleware + global middleware
// app.use((err, req, res, next) => {

//     const errorStatus = "err.status" || 500
//     const errorMessage = "err.message" || "Something went wrong!"

//     return res.status(errorStatus).json({
//         success: false,
//         status: errorStatus,
//         message: errorMessage,
//         stack: err.stack,
//     })
// })



app.use("/", () => {
    console.log("hello world")
}) // our routes

app.use("/hi", () => {
    console.log("hi world")
}) // our routes
// ROUTES
// app.use("/api/auth", authRoute) // our routes
// app.use("/api/users", usersRoute) // our routes
// app.use("/api/hotels", hotelsRoute) // our routes
// app.use("/api/rooms", roomsRoute) // our routes


mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true }, mongoose.set('strictQuery', true))
    .then(() => console.log("MongoDB is connected"))
    .catch((err) => console.log(err.message));



app.listen(process.env.PORT || 5000, (err) => {
    if (err) { throw err.message }
    else { console.log(`espress app running on ${process.env.PORT || 5000}`); }
})