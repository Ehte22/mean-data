const router = require("express").Router()
const userController = require("../controller/user.controller")

router
    .get("/", userController.getAllUsers)
    .post("/create-user", userController.createUser)

module.exports = router