const express = require("express")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/', async (req, res) => {
    res.status(200).json({ message: "Hey, I am nodejs container" })
})
const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Server is running on ${PORT}`))