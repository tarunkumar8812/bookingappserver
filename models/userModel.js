const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        phone: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        password: {
            type: String,
            trim: true,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);