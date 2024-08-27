const Movie = require("../models/Movie")
const ApiFeatures = require("../utils/apiFeatures")
const asyncHandler = require("express-async-handler")
const CustomError = require("../utils/customError")

exports.highestRated = (req, res, next) => {
    req.query.limit = "3"
    req.query.sort = "-rating"

    next()
}

exports.getMovies = asyncHandler(async (req, res) => {
    const { name, rating } = req.query

    const features = new ApiFeatures(Movie.find(), req.query).filter().sort().limitFields().paginate()
    const result = await features.query

    // ************************************************************
    // const excludesFields = ["sort", "page", "limit", "fields"]
    // const queryObj = { ...req.query }

    // excludesFields.forEach((item) => {
    //     delete queryObj[item]
    // })

    // const result = await Movie.find(queryObj)
    // ************************************************************

    // FILTERING
    // for adding $ before gte or lte operator

    // important
    // let queryStr = JSON.stringify(req.query)
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
    // const queryObj = JSON.parse(queryStr)
    // let query = Movie.find()
    // ************************************************************

    // SORTING LOGIC
    // important
    // if (req.query.sort) {
    //     //  sortBy is used for when we are sortting with diffent property 
    //     const sortBy = req.query.sort.split(",").join(" ")
    //     query = query.sort(sortBy);
    // }

    // LIMTING FIELDS
    // important
    // if (req.query.fields) {
    //     const fields = req.query.fields.split(",").join(" ")
    //     query = query.select(fields)
    // } else {
    //     // if we dont want any key
    //     query = query.select("-__v")
    // }

    // PAGINATION
    // important
    // const page = req.query.page * 1 || 1
    // const limit = req.query.limit * 1 || 10

    // const skip = (page - 1) * limit
    // query.skip(skip).limit(limit)

    // if (req.query.page) {
    //     const movieCount = await Movie.countDocuments()
    //     if (skip >= movieCount) {
    //         throw new Error("This page is not found")
    //     }
    // }

    // const result = await query;



    // const result = await Movie.find()
    //     .where("name")
    //     .equals(req.query.name)
    //     .where("rating")
    //     .equals(+rating)

    res.status(200).json({ message: "Movie fetch success", length: result.length, result })
})
exports.getMovie = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    // const movie = await Movie.find({ _id: id })
    const movie = await Movie.findById(id)

    if (!movie) {
        const error = new CustomError(`Movie with id: ${id} is not found`, 400)
        next(error)
    }

    res.status(200).json({ message: `Movie with id: ${id} fetch success`, movie })

})

exports.createMovie = asyncHandler(async (req, res) => {
    const movie = await Movie.create(req.body)
    res.status(200).json({ message: "Movie create success", movie })

})

exports.updateMovie = asyncHandler(async (req, res) => {
    const { id } = req.params
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    res.status(200).json({ message: "Movie Update success", updatedMovie })

})

exports.deleteMovie = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Movie.findByIdAndDelete(id)
    res.status(200).json({ message: "Movie delete success" })
})

exports.getMovieStats = asyncHandler(async (req, res) => {
    const result = await Movie.aggregate([
        // { $match: { rating: { $gte: 3.5 } } },
        // {
        //     $group: {
        //         _id: "$releaseYear",
        //         avgRating: { $avg: '$rating' },
        //         avgPrice: { $avg: '$price' },
        //         minPrice: { $min: '$price' },
        //         maxPrice: { $max: '$price' },
        //         totalPrice: { $sum: '$price' },
        //         movieCount: { $sum: 1 },
        //     }
        // },
        // { $sort: { minPrice: 1 } },
        // { $match: { maxPrice: { $gte: 250 } } },
        // { $match: { price: { $gt: 200 } } },


        // {
        //     $group: {
        //         _id: "$rating",

        //     },


        // },
        // {
        //     $sort: {
        //         _id: -1
        //     }
        // },
        // {
        //     $limit:5
        // }

        // {
        //     $unwind: "$directors"
        // },

        {
            $match: {
                directors: "John Doe"
            }
        },

        {
            "$count": "moviesDirectedByDavidTwohy"
        }






    ])
    res.status(200).json({ message: "Movie stats fetch success", length: result.length, result })

})

exports.getMovieByGenre = asyncHandler(async (req, res) => {
    const { genre } = req.params

    const result = await Movie.aggregate([
        { $unwind: "$geners" },
        {
            $group: {
                _id: "$geners",
                movieCount: { $sum: 1 },
                movies: { $push: "$name" }
            }
        },
        { $addFields: { genre: "$_id" } },
        { $project: { _id: 0 } },
        { $sort: { movieCount: -1 } },
        // { $limit: 3 }
        { $match: { genre: genre } }
    ])
    res.status(200).json({ message: "Movie stats fetch success", length: result.length, result })

})