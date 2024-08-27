import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import { Kafka } from 'kafkajs'

const app = express()

app.use(express.json())

const kafka = new Kafka({ brokers: ["localhost:9092",], clientId: "123" })

const consumer = kafka.consumer({
    groupId: "321",
})
const producer = kafka.producer({})
producer.connect().then((data) => {
    console.log("Producer connected");
}).catch((err) => {
    console.log("errrr", err);
})

consumer.connect().then((data) => {
    console.log("consumer connected");
}).catch((err) => {
    console.log("errrr", err);
});



(async () => {
    try {
        await consumer.subscribe({ topic: "second-topic", fromBeginning: false, })
        await consumer.run({
            eachMessage: async ({ message, topic, partition }) => {
                if (message) {
                    let data = message.value?.toString()
                    console.log("ddddd", data);
                    if (data) {
                        const result = await User.findById(JSON.parse(data).id)
                        console.log("res", result);
                        await producer.send({
                            messages: [
                                { value: JSON.stringify(result) }
                            ], topic: "user-topic",
                        })
                    }
                    // await producer.disconnect()
                }
            }
        })
    } catch (error) {
        console.log("errrrrr", error);
    }
})();




const User = mongoose.model('user', new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    mobile: { type: Number, required: true },
}))




app.post('/', async (req: Request, res: Response) => {
    const result = await User.create(req.body)
    res.status(200).json({ message: "User created successfully", result })
})


// app.get("/", async (req: Request, res: Response) => {
// const result = await User.findById(req.body)
// res.status(200).json({ message: "User created successfully", result })
// })



mongoose.connect("mongodb://localhost:27017/kafka-pr")
mongoose.connection.once('open', () => {
    console.log("MONGOOSE CONNECTED AUTH");
    app.listen(3000, () => {
        console.log("SERVER RUNNING 3000");
    })
})