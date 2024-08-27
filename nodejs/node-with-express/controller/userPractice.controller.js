// const fs = require("fs")

// let users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"))

// exports.checkId = (req, res, next, value) => {
//     console.log(value);
//     const user = users.find(item => item.id === +value)

//     if (!user) {
//         return res.status(404).json({ message: `User with id: ${value} not found` })
//     }

//     next()
// }

// exports.validityBody = (req, res, next) => {
//     if (!req.body.name || !req.body.email) {
//         return res.status(404).json({ message: "User is not validate" })
//     }

//     next()
// }

// exports.getUsers = (req, res) => {
//     res.status(200).json({ message: "Users fetch success", count: users.length, requestedAt: req.requestedAt, users })
// }

// exports.getUser = (req, res) => {
//     const { id } = req.params

//     const user = users.find(item => item.id === +id)

//     // if (!user) {
//     //   return  res.status(404).json({ message: `User with id: ${id} not found` })
//     // }
//     res.status(200).json({ message: `User with id: ${id} fetch success`, user })
// }

// exports.createUser = (req, res) => {
//     let id = users[users.length - 1].id + 1
//     const newUser = { id, ...req.body }

//     users.push(newUser)

//     fs.writeFile("./data/users.json", JSON.stringify(users), (err, data) => {
//         res.status(200).json({ message: "User create success", newUser })
//     })
// }

// exports.updateUser = (req, res) => {
//     const { id } = req.params

//     const user = users.find(item => item.id === +id)
//     // if (!user) {
//     //   return  res.status(404).json({ message: `User with id: ${id} not found` })
//     // }
//     const index = users.indexOf(user)
//     Object.assign(user, req.body)
//     users[index] = user

//     // const index = users.findIndex(item => item.id === +id)
//     // users[index] = req.body


//     fs.writeFile("./data/users.json", JSON.stringify(users), (err, data) => {
//         res.status(200).json({ message: "User update success", user })
//     })

// }

// exports.deleteUser = (req, res) => {
//     const { id } = req.params

//     const user = users.find(item => item.id === +id)
//     // if (!user) {
//     //   return  res.status(404).json({ message: `User with id: ${id} not found` })
//     // }
//     const index = users.indexOf(user)
//     users.splice(index, 1)

//     // users = users.filter(item => item.id !== +id)

//     // const index = users.findIndex(item => item.id === +id)
//     // users.splice(index, 1)

//     fs.writeFile("./data/users.json", JSON.stringify(users), (err, data) => {
//         res.status(200).json({ message: "User delete success" })
//     })
// }