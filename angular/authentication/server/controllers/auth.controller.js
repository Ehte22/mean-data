const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const User = require("../models/User")
const { checkEmpty } = require("../utils/checkEmpty")
const { genrateOTP } = require("../utils/genrateOtp")
const { sendEmail } = require("../utils/email")
const { genrateToken } = require("../utils/genrateToken")
const { use } = require("../routes/auth.route")

exports.register = asyncHandler(async (req, res) => {
    const { password } = req.body
    const hashPass = await bcrypt.hash(password, 10)
    await User.create({ ...req.body, password: hashPass })
    res.status(200).json({ message: "User Register Success" })
})

exports.login = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    const result = await User.findOne({
        $or: [
            { email: username },
            { phone: username }
        ]
    })

    const { isError, error } = checkEmpty({ username, password })
    if (isError) {
        return res.status(404).json({ message: "All Fields required", error })
    }

    if (!result) {
        return res.status(404).json({ message: "Invalid Credential - Email / Phone Number do not match" })
    }

    const verify = await bcrypt.compare(password, result.password)

    if (!verify) {
        return res.status(404).json({ message: "Invalid Credential - Password Do Not Match" })
    }

    const otp = genrateOTP(4)
    await User.findByIdAndUpdate(result._id, { otp })
    await sendEmail({ to: result.email, subject: "Login OTP", message: `Your Login OTP is ${otp}` })


    res.json({ message: "User Login Success" })
})

exports.verifyOtp = asyncHandler(async (req, res) => {
    const { userName, otp } = req.body
    const { isError, error } = checkEmpty({ otp })
    if (isError) {
        return res.status(400).json({ message: "All Fileds Required", error })
    }

    const result = await User.findOne({ otp })
    console.log(result);

    // if (!result) {
    //     return res.status(400).json({ message: "Invalid Credential - Email / Mobile Not Found" })
    // }
    if (!result) {
        return res.status(400).json({ message: "Invalid OTP" })
    }
    const token = genrateToken({ userId: result._id })
    res.cookie("user", token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        secure: process.NOD_ENV === "production"
    })

    res.json({
        message: "Login Success",
        result: {
            _id: result._id,
            name: result.name,
            email: result.email
        }
    })
})

exports.logout = asyncHandler(async (req, res) => {
    res.clearCookie("user")
    res.json({ message: "User Logout Success" })
})

exports.getUsers = asyncHandler(async (req, res) => {
    const result = await User.find()
    res.json({ message: "User Fetch Success", result })
})