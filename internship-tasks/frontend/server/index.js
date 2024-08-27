const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config({ path: "./.env" })

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: "http://localhost:4200",
    credentials: true
}))

app.use("/api/v1/user", require("./routes/user.routes"))

app.use("*", (req, res, next) => {
    res.status(404).json({ message: "Resource not found" })
})

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message | "something went wrong" })
})

mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open", () => {
    console.log("MongoDB is Connected")
    app.listen(process.env.PORT, console.log(`Server is running on ${process.env.PORT}`))
})