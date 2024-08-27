const mongoose = require("mongoose")
const fs = require("fs")
const validator = require("validator")

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required filed"],
        unique: true,
        // used only on string type
        maxlength: [100, "Movie name must have not more than 100 characters"],
        minlength: [4, "Movie name must have at least 4 characters"],
        // validate: [validator.isAlpha, "Name should only contain alphabet characters"]
    },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    rating: {
        type: Number,
        required: true,
        // min: [1, "Rating must be 1.0 or above"],
        // max: [5, "Rating must be 5.0 or below"]
        // CUSTOM VALIDATOR
        validate: {
            validator: function (value) {
                return value >= 1 && value <= 5
            },
            message: "Rating ({VALUE}) should be above 1 and below 5"
        }
    },
    totlaRating: { type: Number, required: true },
    releaseYear: { type: Number, required: true },
    releaseData: { type: String, required: true },
    geners: {
        type: [String],
        required: true,
        // We can only select genre from this enum values
        enum: {
            values: ["Action", "Adventure", "Thriller", "Comedy", "Drama"],
            message: "This genre does not exist"
        }
    },
    directors: { type: [String], required: true },
    coverImage: { type: String, required: true },
    actors: { type: [String], required: true },
    price: {
        type: Number, required: true
        // if we dont want to show price property to client hide it using select
        // select: false
    },
    createdBy: String,
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

movieSchema.virtual("durationInHours").get(function () {
    return this.duration / 60
})

// document middleware
// executed before the document saved in th database
// save event happent when we called .save() or .create()
movieSchema.pre("save", function (next) {
    this.createdBy = "Arbaaz"
    next()
})

movieSchema.post("save", function (doc, next) {
    const content = `A new movie document with name ${doc.name} has been create by ${doc.createdBy}\n`
    // flag is user for not override text in log.txt
    fs.writeFileSync("./log/log.txt", content, { flag: "a" }, (err) => {
        console.log(err.message);
    })
    next()
})

// middleware to modify the query
// NOT WORKING
// movieSchema.pre("find", function (next) {
//     console.log(Date.now());
//     this.find({ releaseData: { $gte: Date.now() } })
//     next()
// })


module.exports = mongoose.model("movie", movieSchema)

