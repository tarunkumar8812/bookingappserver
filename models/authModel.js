// const mongoose = require("mongoose");
// const HotelSchema = new mongoose.Schema(
//     {
//         name: {
//             type: String,
//             required: true,
//             trim: true,
//         },
//         type: {
//             type: String,
//             required: true,
//         },
//         city: {
//             type: String,
//             required: true,
//             trim: true
//         },
//         address: {
//             type: String,
//             required: true,
//             trim: true
//         },
//         distance: {
//             type: String,
//             required: true,
//             trim: true
//         },
//         photos: {
//             type: String
//         },
//         title: {
//             type: String,
//             required: true
//         },
//         description: {
//             type: String,
//             required: true
//         },
//         rating: {
//             type: Number,
//             min: 0,
//             max: 5
//         },
//         rooms: {
//             type: [String]
//         },
//         cheapestPrice: {
//             type: Number,
//             required: true
//         },
//         fetured: {
//             type: Boolean,
//             required: false
//         }
//     },
//     { timestamps: true }
// );

// module.exports = mongoose.model("Hotel", HotelSchema);