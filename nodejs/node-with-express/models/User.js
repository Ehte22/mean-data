const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required field"]
    },
    email: {
        type: String,
        required: [true, "Email is required field"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    photo: String,
    password: {
        type: String,
        required: [true, "Password is required field"],
        // select: false
    },
    cpassword: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            validator: function (val) {
                return this.password === val
            },
            message: "Confirm Password does not match"
        }
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date
})

// encrypt the password before saving in database
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    // encrypt the password before saving it
    this.password = await bcrypt.hash(this.password, 12)
    this.cpassword = undefined

    next()
})


module.exports = mongoose.model("user", userSchema)

