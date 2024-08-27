const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
require("dotenv").config({ path: "./.env" })

const app = express()

app.use(express.json())
app.use(cors({
    origin: "http://localhost:4200",
    credentials: true
}))
app.use(cookieParser())

const productSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
    name: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
}, { timestamps: true })

const Product = mongoose.model("product", productSchema)

const protected = async (req, res, next) => {
    try {
        if (!req.cookies.auth) {
            return res.status(401).json({ message: "No cookie found" })
        }

        jwt.verify(req.cookies.auth, process.env.JWT_SECRET_KEY, (err, decoded) => {
            console.log(decoded);
            if (err) {
                return res.status(403).json({ message: "JWT error" })
            }

            req.body.userId = decoded.userId
            next()
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

app.post("/api/v1/add-product", protected, async (req, res) => {
    try {
        console.log(req.body);
        const result = await Product.create(req.body)
        res.status(200).json({ message: "Prodct add successfully", result })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get("/api/v1/products", protected, async (req, res) => {
    try {
        const result = await Product.find({ userId: req.body.userId })
        res.status(200).json({ message: "Prodct get successfully", result })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.put("/api/v1/update-product/:id", protected, async (req, res) => {
    try {
        const { id } = req.params
        const result = await Product.findByIdAndUpdate(id, req.body)
        res.status(200).json({ message: "Prodct update successfully", result })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.delete("/api/v1/delete-product/:id", protected, async (req, res) => {
    try {
        const { id } = req.params
        await Product.findByIdAndDelete(id)
        res.status(200).json({ message: "Prodct delete successfully" })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.use("*", (req, res, next) => {
    res.status(404).json({ message: "Resource not found" })
})

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message || "something went wrong" })
})

mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open", () => {
    console.log("DB is connected");
    app.listen(process.env.PORT, console.log(`Server in running on: ${process.env.PORT}`))
})