const { getAllTasks, addTask, updateTask, deleteTask } = require("../controllers/taskController")

const router = require("express").Router()

router
    .get("/", getAllTasks)
    .post("/add-task", addTask)
    .put("/update-task/:id", updateTask)
    .delete("/delete-task/:id", deleteTask)

module.exports = router