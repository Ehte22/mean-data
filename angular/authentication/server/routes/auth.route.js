const router = require("express").Router()
const authController = require("./../controllers/auth.controller.js")

router
    .post("/user-register", authController.register)
    .post("/user-login", authController.login)
    .post("/user-verify-otp", authController.verifyOtp)
    .post("/user-logout", authController.logout)
    .get("", authController.getUsers)

module.exports = router