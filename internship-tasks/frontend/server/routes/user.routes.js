const router = require("express").Router()
const userController = require("../controllers/user.controller")

router
    .post("/create-user", userController.addUser)
    .get("/users", userController.getUsers)
    .put("/update-user/:id", userController.updateUser)
    .delete("/delete-user/:id", userController.deleteUser)

module.exports = router