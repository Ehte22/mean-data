const asyncHandler = require("express-async-handler")
const upload = require("../utils/upload")
const User = require("../models/User")
const fs = require("fs")

exports.addUser = asyncHandler(async (req, res) => {
    upload(req, res, async (err) => {
        const { fname, lname, email, phone } = req.body
        console.log(req.file);
        console.log(req.body);

        if (err) {
            return res.status(400).json({ message: err.message | "multer error" })
        }

        const user = await User.findOne({
            $and: [
                { email: email },
                { phone: phone }
            ]
        });

        if (user) {
            if (user.email) {
                return res.status(400).json({ message: "Email already exist" })
            }
            if (user.phone) {
                return res.status(400).json({ message: "Phone number already exist" })
            }
        }

        const newUser = await User.create({ ...req.body, file: req.file.filename })
        res.status(200).json({ message: "User created successfully", result: newUser })

    })
})

exports.getUsers = asyncHandler(async (req, res) => {
    const result = await User.find()
    res.status(200).json({ message: "Users get successfully", result })
})

exports.updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params

    upload(req, res, async (err) => {
        console.log(req.body)
        console.log(req.file)

        if (err) {
            return res.status(400).json({ message: err.message | "multer error" })
        }

        if (req.file) {
            fs.unlinkSync(path.join(__dirname, "..", "public", req.body.remove))
            await User.findByIdAndUpdate(id, { ...req.body, file: req.file.filename }, { new: true, runValidators: true })
            res.status(200).json({ message: "User updated successfully" })
        } else {
            await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
            res.status(200).json({ message: "User updated successfully" })
        }
    })
})

exports.deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    await User.findByIdAndDelete(id)
    res.status(200).json({ message: "User delete successfully" })
})