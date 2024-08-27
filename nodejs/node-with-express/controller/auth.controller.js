const asyncHandler = require("express-async-handler")
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const crypto = require("crypto")
const sendEmail = require("../utils/email")

exports.register = asyncHandler(async (req, res) => {
    const newUser = await User.create(req.body)

    res.status(200).json({ message: "User register success", newUser })
})

exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(400).json({ message: "Please provide email and password" })
    }

    const result = await User.findOne({ email })

    if (!result) {
        res.status(400).json({ message: "Invalid Credential - Email Not Found" })
    }

    const verify = await bcrypt.compare(password, result.password)

    if (!verify) {
        res.status(400).json({ message: "Invalid Credential - Password does not match" })
    }


    const token = jwt.sign(
        { id: result._id, role: result.role },
        process.env.JWT_KEY,
        { expiresIn: process.env.JWT_EXPIRY }
    )

    res.cookie("prac", token, { maxAge: 86400000, httpOnly: true, secure: process.env.NODE_ENV === "production" })

    res.status(200).json({
        message: "User login success", token,
        result: {
            id: result._id,
            name: result.name,
            email: result.email
        }
    })
})

exports.logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("prac")
    res.json({ message: "User Logout Success" })
})

exports.protected = asyncHandler(async (req, res, next) => {
    const { prac } = req.cookies
    if (!prac) {
        return res.status(401).json({ message: "No Cookie Found" })
    }

    jwt.verify(prac, process.env.JWT_KEY, (err, decode) => {
        console.log(decode);
        console.log(decode.id);
        if (err) {
            return res.status(403).json({ message: err.message || "JWT error" })
        }
        req.user = decode
        next()
    })
})

// if we get many argument we can use
// exports.restrict = (...role) => {
// if (!role.includes(req.user.role)) {
exports.restrict = (role) => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== role) {
            return res.status(403).json({ message: "You don't have permission to perform this action" })
        }
        next()
    }
}

exports.forgotPassword = asyncHandler(async (req, res, next) => {
    const { email } = req.body
    const result = await User.findOne({ email })

    if (!result) {
        return res.status(404).json("We could not find the user with given email")
    }
    // create a reset token but its not encrypted
    const resetToken = crypto.randomBytes(32).toString("hex")

    // encrypted reset token
    const passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    const passwordResetTokenExpires = Date.now() + 10 * 60 * 1000

    result.passwordResetToken = passwordResetToken
    result.passwordResetTokenExpires = passwordResetTokenExpires

    result.save({ validateBeforeSave: false })

    // Send the token back to the user email
    const resetUrl = `${req.protocol}//:${req.get("host")}/api/users/reset/${resetToken}`

    try {
        await sendEmail({
            to: process.env.EMAIL,
            message: `we have recieved a password reset request. Please click the below link to reset your password\n\n${resetUrl}\n\nThis reset password link will be valid only for 10 minutes.`,
            subject: "Password change request recieved",
        })
        return res.status(201).json({ message: "Password reset link send to to the user's email" })
    } catch (error) {
        result.passwordResetToken = undefined;
        result.passwordResetTokenExpires = undefined;

        result.save({ validateBeforeSave: false })

        return res.status(500).json({ message: error.message || "There was an error sending password reset email . Please try again later" })
    }

})

exports.resetPassword = asyncHandler(async (req, res) => {
    const { token } = req.params

    // encrypting password reset token
    const encryptedToken = crypto.createHash("sha256").update(token).digest("hex")

    // find with same token and expires or not
    const result = await User.findOne({ passwordResetToken: encryptedToken, passwordResetTokenExpires: { $gt: Date.now() } })

    if (!result) {
        return res.status(400).json({ message: "Token is invalid or has expired" })
    }

    if (req.body.password !== req.body.cpassword) {
        return res.status(400).json({ message: "Confirm password does not match" })
    }

    result.password = req.body.password
    result.cpassword = req.body.cpassword
    result.passwordResetToken = undefined
    result.passwordResetTokenExpires = undefined



    result.save()

    // const logintoken = jwt.sign(
    //     { id: result._id, role: result.role },
    //     process.env.JWT_KEY,
    //     { expiresIn: process.env.JWT_EXPIRY }
    // )

    // res.cookie("prac", logintoken, { maxAge: 86400000, httpOnly: true, secure: process.env.NODE_ENV === "production" })

    // res.status(200).json({
    //     message: "User login success", logintoken,
    //     result: {
    //         _id: result._id,
    //         name: result.name,
    //         email: result.email
    //     }
    // })

    res.status(201).json({ message: "Password create success" })
})

exports.updatePassword = asyncHandler(async (req, res) => {

    // get current login user data
    // using select we can also access the users password
    const _id = req.user.id
    const result = await User.findOne({ _id })
    console.log(result);

    // check old password before update it
    const verify = await bcrypt.compare(req.body.currentPassword, result.password)

    if (!verify) {
        return res.status(401).json({ message: "The current password you provided is wrong" })
    }

    result.password = req.body.password
    result.cpassword = req.body.cpassword
    result.passwordResetToken = undefined
    result.passwordResetTokenExpires = undefined

    await result.save()

    res.status(201).json({ message: "Password update success" })
})

