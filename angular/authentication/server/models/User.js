const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    otp: { type: String },
    role: { type: String, default: "user", enum: ["user", "admin"] },
    active: { type: Boolean, default: false },
})

module.exports = mongoose.model("user", userSchema);


