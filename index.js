const express = require('express')
// const mongoose = require('mongoose')
const userRoute = require('./routes/cartRoute.js')
// const cartRoute = require('./routes/cartRoute.js')
const app = express()
const PORT = 5500



// app.use("/h", (req, res) => {
//     res.json({ msg: "hello world" })
// }) // our routes
// app.use("/hi", (req, res) => {
//     res.json({ msg: "hi world" })
// }) // our routes
app.use("/user", userRoute)
// app.use("/api/cart", cartRoute)
// our routes



// mongoose
//     .connect(process.env.MONGO_URL, { useNewUrlParser: true }, mongoose.set('strictQuery', true))
//     .then(() => console.log("MongoDB is connected"))
//     .catch((err) => console.log(err.message));



app.listen(PORT, (err) => {
    if (err) { throw err.message }
    else { console.log(`espress app running on ${PORT}`); }
})