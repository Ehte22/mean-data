const router = require("express").Router()
const authController = require("../controller/auth.controller")


router
    .post("/register", authController.register)
    .post("/login", authController.login)
    .post("/logout", authController.logoutUser)
    .post("/forgot", authController.forgotPassword)
    .patch("/reset/:token", authController.resetPassword)
    .patch("/updatePass", authController.protected, authController.updatePassword)

module.exports = router