const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
require("dotenv").config({ path: './.env' })

const app = express()

app.use(express.json())
app.use(cors({
    origin: "http://localhost:4200",
    credentials: true
}))
app.use(cookieParser())

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
}, { timestamps: true })

const User = mongoose.model("user", userSchema)

app.post("/api/v1/register", async (req, res) => {
    try {
        const { name, email, password } = req.body

        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "Email already exist" })
        }

        const hashPass = await bcrypt.hash(password, 10)
        const newUser = await User.create({ name, email, password: hashPass })

        res.status(200).json({
            message: "sign up successfully", result: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        })


    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.post("/api/v1/login", async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "invalid email" })
        }

        const verify = await bcrypt.compare(password, user.password)

        if (!verify) {
            return res.status(400).json({ message: "invalid password" })
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRY })

        res.cookie("auth", token, { maxAge: 864000000, httpOnly: true, secure: process.env.NODE_ENV === "production" })
        res.status(200).json({
            message: "Logged in successfully", result: {
                _id: user._id,
                name: user.email,
                email: user.email,
            }
        })


    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.post("/api/v1/logout", async (req, res) => {
    res.clearCookie("auth")
    res.status(200).json({ message: "Logged out successfully" })
})

app.use("*", (req, res, next) => {
    res.status(404).json({ message: "Resource not found" })
})

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message || "something went wrong" })
})

mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open", () => {
    console.log("DB is connected")
    app.listen(process.env.PORT, console.log(`Server is running on: ${process.env.PORT}`))
})
