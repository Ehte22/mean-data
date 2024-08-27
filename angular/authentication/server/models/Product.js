const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    preview: { type: String, required: true },
    publish: { type: Boolean, default: false },
})

module.exports = mongoose.model("product", productSchema)