import express, { Request, Response } from 'express'
import { Kafka } from 'kafkajs'
import { messageProducer } from '../kafka/kafka'
import { ORDER_FAILED, ORDER_REQUEST, ORDER_SUCCESS } from '../kafka/topics'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const kafka = new Kafka({
    clientId: "order-kafka-client-id",
    brokers: ["localhost:9092"]
})

const consumer = kafka.consumer({ groupId: 'order-kafka-group-id' })

app.post("/", async (req: Request, res: Response) => {
    console.log(req.body, "message produing");

    await messageProducer(ORDER_REQUEST, req.body)

    await consumer.connect()
    console.log("consumer connnected");

    await consumer.subscribe({ topics: [ORDER_SUCCESS, ORDER_FAILED], fromBeginning: false })

    await consumer.run({
        eachMessage: async ({ topic, message }) => {
            try {
                const data = JSON.parse(message.value?.toString()!)
                if (topic === ORDER_SUCCESS) {
                    res.status(200).json({ message: "Order success", data })
                } else {
                    res.status(400).json({ message: "Order fail", data })
                }
            } catch (error) {
                res.status(500).json({ message: "Order Failed", error })
            } finally {
                consumer.disconnect();
                console.log("Consumer disconnected");
            }
        }
    })

})

app.listen(3000, () => {
    console.log('Server Running on 3000');
})