const asyncHandler = require("express-async-handler")
const Product = require("../models/Product")
const upload = require("../utils/upload")
const fs = require("fs")
const path = require("path")

exports.getProducts = asyncHandler(async (req, res) => {
    const result = await Product.find()
    res.json({ message: "Product Fetch Success", result })
})

exports.addProduct = asyncHandler(async (req, res) => {

    upload(req, res, async err => {
        console.log(req.file);
        console.log(req.body);
        if (err) {
            res.status(404).json({ message: err.message || "unable to upload" })
        }
        const x = await Product.create({ ...req.body, image: req.file.filename })
        res.json({ message: "Product Add Success", result: x })
    })

})

exports.updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params
    upload(req, res, async (err) => {
        console.log(req.body);
        if (err) {
            return res.status(404).json({ message: err.message || "something went wrong" })
        }
        if (req.file) {
            fs.unlinkSync(path.join(__dirname, "..", "uploads", req.body.remove))
            await Product.findByIdAndUpdate(id, { ...req.body, image: req.file.filename })
            res.json({ message: "Product Update Success" })
        } else {
            await Product.findByIdAndUpdate(id, req.body)
            res.json({ message: "Product Update Success" })
        }
    })
})

exports.deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Product.findByIdAndDelete(id)
    res.json({ message: "Product Delete Success" })
})