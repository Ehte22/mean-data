const router = require("express").Router()
const movieController = require("../controller/movie.controller.js")
const authController = require("../controller/auth.controller.js")

router
    .get("/highest-rated", movieController.highestRated, movieController.getMovies)

router.get("/movies-stats", movieController.getMovieStats)
router.get("/movies-by-genre/:genre", movieController.getMovieByGenre)

// router.param("id", movieController.checkId)

router.route("/")
    .get(authController.protected, movieController.getMovies)

    // chaining middlewares
    // .post(movieController.validityBody, movieController.createMovie)
    .post(movieController.createMovie)

router.route("/:id")
    .get(authController.protected, movieController.getMovie)
    .put(movieController.updateMovie)
    .delete(authController.protected, authController.restrict("admin"), movieController.deleteMovie)

module.exports = router 