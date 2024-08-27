const nodemailer = require("nodemailer")

// const sendEmail = async (option) => {
//     const transporter = nodemailer.createTransport({
//         host: process.env.EMAIL_HOST,
//         port: process.env.EMAIL_PORT,
//         auth: {
//             user: process.env.EMAIL_USER,
//             pass: process.env.EMAIL_PASSWORD
//         }
//     })

//     // Define email options
//    await transporter.sendMail({
//         from: "syedehteshamali22@gmail.com",
//         to: option.email,
//         subject: option.subject,
//         text: option.message
//     })

// }


const sendEmail = ({ to, subject, message }) => new Promise((resolve, reject) => {
    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS
        }
    })

    transport.sendMail({
        from: process.env.EMAIL,
        to,
        subject,
        text: message
    }, (err) => {
        if (err) {
            // console.log(err.message || "unable to send email")
            reject(err.message || "unable to send email")
        } else {
            // console.log("Email send success")
            resolve("Email send success")
        }
    })
})


module.exports = sendEmail