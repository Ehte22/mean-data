class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query
        this.queryStr = queryStr
    }

    filter() {
        let queryString = JSON.stringify(this.queryStr)
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)

        const queryObj = JSON.parse(queryString)
        this.query = this.query.find(queryObj)

        return this;
    }

    sort() {
        if (this.queryStr.sort) {
            console.log(this.queryStr.sort);
            //  sortBy is used for when we are sortting with diffent property 
            const sortBy = this.queryStr.sort.split(",").join(" ")
            this.query = this.query.sort(sortBy);
        }

        return this;
    }

    limitFields() {
        if (this.queryStr.fields) {
            const fields = this.queryStr.fields.split(",").join(" ")
            this.query = this.query.select(fields)
        } else {
            // if we dont want any key
            this.query = this.query.select("-__v")
        }

        return this;
    }

    paginate() {
        const page = this.queryStr.page * 1 || 1
        const limit = this.queryStr.limit * 1 || 20

        const skip = (page - 1) * limit
        this.query.skip(skip).limit(limit)

        // if (req.query.page) {
        //     const movieCount = await Movie.countDocuments()
        //     if (skip >= movieCount) {
        //         throw new Error("This page is not found")
        //     }
        // }

        return this;
    }
}

module.exports = ApiFeatures