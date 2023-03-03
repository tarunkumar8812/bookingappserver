const express = require('express')
// const mongoose = require('mongoose')
const testRoutee = require('./routes/routes.js')
const app = express()
const PORT = 5500



app.use("/", (req, res) => {
    res.json({ msg: "hello world" })
}) // our routes
app.use("/hi", (req, res) => {
    res.json({ msg: "hi world" })
}) // our routes
app.use("/bye", testRoutee)
// our routes



// mongoose
//     .connect(process.env.MONGO_URL, { useNewUrlParser: true }, mongoose.set('strictQuery', true))
//     .then(() => console.log("MongoDB is connected"))
//     .catch((err) => console.log(err.message));



app.listen(PORT, (err) => {
    if (err) { throw err.message }
    else { console.log(`espress app running on ${PORT}`); }
})