const mongoose = require("mongoose")
const fs = require("fs")
const Movie = require("../models/Movie")
require("dotenv").config({ path: "./.env" })

mongoose.connect(process.env.LOCAL_CONN_STR)
    .then(conn => console.log("DB is connected"))
    .catch(err => console.log("some error has occured"))

const movies = JSON.parse(fs.readFileSync("./data/movie.json", "utf-8"))

const deleteMovies = async (req, res) => {
    try {
        await Movie.deleteMany()
        console.log("Data Successfully Deleted");
    } catch (error) {
        console.log(error.message);
    }
}

const importMovies = async (req, res) => {
    try {
        await Movie.create(movies)
        console.log("Data Successfully imported");
    } catch (error) {
        console.log(error.message);
    }
}

if (process.argv[2] === "--import") {
    importMovies()
}
if (process.argv[2] === "--delete") {
    deleteMovies()
}