const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const rateLimit = require("express-rate-limit")
const helmet = require("helmet")
const sanitize = require("express-mongo-sanitize")
const xss = require("xss-clean")
// const waf = require('express-waf')
const hpp = require("hpp")
require("dotenv").config({ path: "./.env" })

const movieRouter = require("./routes/movie.routes")
const authRouter = require("./routes/auth.routes")
const CustomError = require("./utils/customError")


const app = express()

const logger = (req, res, next) => {
    console.log("Custom Middleware Called");
    next()
}

// this middlewares is use for security purpose
// app.use(waf())
app.use(helmet())
// using rate limit middleware we can set the limitation of request sent by the client
app.use(rateLimit({
    max: 100,
    windowMs: 1000 * 60 * 60,
    delayMs: 0,
    message: "We have recieved to many request from this IP. Please try after one hour."
}))

// middlewares
app.use(express.json({ limit: "10kb" }))

// for security purpose
// data sanitization middleware 
// this middleware sanitize query like $ .
app.use(sanitize())
// sanitizing html code comes from req.body
app.use(xss())

// avoid parameter pollution
app.use(hpp({ whitelist: ["duration", "rating"] }))

app.use(cookieParser())
app.use(logger)
app.use(express.static("./public"))
// third party middleware
app.use(morgan("dev"))

app.use((req, res, next) => {
    req.requestedAt = new Date()
    next()
})



// app.get("/api/users", getUsers)
// app.get("/api/users/:id", getUser)
// app.post("/api/users", createUser)
// app.delete("/api/users/:id",)
// app.put("/api/users/:id", updateUser)

// for checking we are in production mode or development mode
// console.log(app.get("env"));

// routes
app.use("/api/movies", movieRouter)
app.use("/api/users", authRouter)

// routes error handler
app.use("*", (req, res, next) => {
    res.status(404).json({ message: `Can't find ${req.originalUrl} on the server` })

    // const err = new Error(`Can't find ${req.originalUrl} on the server`)
    // err.statusCode = 404
    // err.status = "fail"

    // const err = new CustomError(`Can't find ${req.originalUrl} on the server`, 404)

    // directly call to global error handler
    // next(err)
})

// global error handler
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || "error"
    res.status(err.statusCode).json({
        status: err.statusCode,
        message: err.message || "Server error"
    })
})

mongoose.connect(process.env.LOCAL_CONN_STR)
    .then((conn) => {
        console.log("DB is connected");
    }).catch((err) => {
        console.log("some error has occured");
    })

app.listen(process.env.PORT, () => {
    console.log("Server is Running")
})