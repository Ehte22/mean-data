const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    time: { type: String, required: true },
    date: { type: String, required: true },
    city: { type: String, required: true },
    file: { type: String, required: true },
    gender: { type: String, required: true },
    disability: { type: String, required: true },
    address: { type: String, required: true },
}, { timestamps: true })

module.exports = mongoose.model("user", userSchema)