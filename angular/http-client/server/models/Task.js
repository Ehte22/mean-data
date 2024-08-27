const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    task: { type: String, required: true },
    desc: { type: String, required: true },
    priority: { type: String, required: true },
    status: { type: String, required: true },
    assigned: { type: String, required: true },
    created: { type: String, required: true }
})

module.exports = mongoose.model("task", taskSchema)