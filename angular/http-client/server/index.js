const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config({ path: "./.env" })

const app = express()

// middleware
app.use(express.json())
app.use(cors());

// route
app.use("/api/task", require("./routes/taskRoute"));

// 404 if route path is not match
app.use("*", (req, res) => {
    res.status(404).json({ message: "Resource not found" })
})

// error handler
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message || "something went wrong" })
})

// connection with database
mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open", () => {
    console.log("MONGO CONNECTED");
    app.listen(process.env.PORT, console.log(`SERVER IS RUNNING ON ${process.env.PORT}`))
})