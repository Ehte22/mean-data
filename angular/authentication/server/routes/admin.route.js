const router = require("express").Router()
const adminController = require("../controllers/admin.controller")

router
    .get("/products", adminController.getProducts)
    .post("/add-product", adminController.addProduct)
    .put("/update-product/:id", adminController.updateProduct)
    .delete("/delete-product/:id", adminController.deleteProduct)

module.exports = router