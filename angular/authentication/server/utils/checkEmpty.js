const validator = require("validator")

exports.checkEmpty = (config) => {
    let isError = false
    let error = []
    for (const key in config) {
        if (validator.isEmpty(config[key])) {
            isError = true
            error.push(`${key} is required`)
        }
    }
    return { isError, error }
}