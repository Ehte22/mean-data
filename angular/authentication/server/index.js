const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
require("dotenv").config({ path: "./.env" })
const path = require("path")

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "*",
    credentials: true
}))

// app.use(express.static("uploads"))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/auth", require("./routes/auth.route"))
app.use("/api/admin", require("./routes/admin.route"))

app.use("*", (req, res) => {
    res.status(404).json({ message: "Resource Not Found" })
})

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message || "something went wrong" })
    next()
})

mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open", () => {
    console.log("MONGO CONNECTED");
    app.listen(process.env.PORT, console.log("Server is Running"))
})