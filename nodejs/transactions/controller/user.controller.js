const asyncHandler = require("express-async-handler")
const mongoose = require("mongoose")
const User = require("../models/User")
const Address = require("../models/Address")

// mongoose.connect("mongodb://127.0.0.1:27017/transaction", {
//     // useNewUrlParser: true,
//     // useUnifiedTopology: true
// })

exports.createUser = async (req, res) => {
    const session = await mongoose.startSession()
    try {
        session.startTransaction()


        const { name, email, password, street1, street2, city, pincode, country } = req.body
        const address = await Address.create([{ street1, street2, city, pincode, country }], { session: session })
        console.log("address created", address[0]._id);
        const user = await User.create([{ name, email, password, address: address[0]._id }], { session })

        await session.commitTransaction()
        // session.endSession()

        res.status(200).json({ message: "User create success" })
    } catch (error) {
        await session.abortTransaction()
        // session.endSession()
        res.status(400).json({ message: error.message })
    } finally {
        session.endSession(); // Ensure session is ended
    }
}

exports.getAllUsers = asyncHandler(async (req, res) => {
    const result = await User.find().populate("address")

    res.status(200).json({ message: "User fetch success", result })
})