exports.genrateOTP = (limit) => {
    let str = "0123456789"
    let otp = ""
    for (let i = 0; i < limit; i++) {
        const x = Math.floor(Math.random() * str.length)
        otp += str[x]
    }
    return otp
}