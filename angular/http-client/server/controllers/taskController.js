const asyncHandler = require("express-async-handler")
const Task = require("../models/Task")

exports.getAllTasks = asyncHandler(async (req, res) => {
    const result = await Task.find()
    res.json({ message: "Task Fetch Success", result })
})

exports.addTask = asyncHandler(async (req, res) => {
    console.log(req.body);
    await Task.create(req.body)
    res.json({ message: "Task Create Success" })
})

exports.updateTask = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Task.findByIdAndUpdate(id, req.body)
    res.json({ message: "Task Update Success" })
})

exports.deleteTask = asyncHandler(async (req, res) => {
    const { id } = req.params
    console.log(req.params);

    await Task.findByIdAndDelete(id)
    res.json({ message: "Task Delete Success" })
})