const express = require("express")
const mongoose = require("mongoose")

const app = express()

app.use(express.json())

app.use("/api/v1/user", require("./routes/user.routes"))

app.use("*", (req, res, next) => {
    res.status(404).json({ message: "Resource not found" })
})

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message || "something went wrong" })
})

const mongoUrl = "mongodb://127.0.0.1:27017/transaction"
const port = 5000 || 3000
mongoose.connect(mongoUrl)
mongoose.connection.once("open", () => {
    console.log("Db is connected");
    app.listen(port, console.log(`Server is running on ${port}`))
})



