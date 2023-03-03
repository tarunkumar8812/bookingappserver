const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const authRoute = require('./routes/authRoute.js')
const userRoute = require('./routes/userRoute.js')
const hotelRoute = require('./routes/hotelRoute.js')
const roomRoute = require('./routes/roomRoute.js')
const cookieParser = require('cookie-parser')
const PORT = 5000
const MONGO_URL = "mongodb+srv://TarunKumar123:xLcX9W1SI9646ftM@cluster1.tpwtwiv.mongodb.net/BookingApp"

const app = express()
// is global middleware
app.use(cors())
app.use(cookieParser())
app.use(express.json())

// error handling middleware + global middleware
app.use((err, req, res, next) => {

    const errorStatus = "err.status" || 500
    const errorMessage = "err.message" || "Something went wrong!"

    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
})


// ROUTES
app.use("/", (req, res) => {
    res.json({ msg: "server is working fine" })
}) // our routes
app.use("/api/users", userRoute) // our routes
app.use("/api/auth", authRoute) // our routes
app.use("/api/hotels", hotelRoute) // our routes
app.use("/api/rooms", roomRoute) // our routes

mongoose
    .connect(MONGO_URL, { useNewUrlParser: true }, mongoose.set('strictQuery', true))
    .then(() => console.log("MongoDB is connected"))
    .catch((err) => console.log(err.message));



app.listen(PORT || 5000, (err) => {
    if (err) { throw err.message }
    else { console.log(`espress app running on ${PORT || 5000}`); }
})