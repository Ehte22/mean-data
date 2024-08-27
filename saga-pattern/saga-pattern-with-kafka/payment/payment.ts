import { Kafka } from 'kafkajs'
import express, { Request, Response } from 'express'
import { PAYMENT_FAILED, PAYMENT_REQUEST, PAYMENT_SUCCESS } from '../kafka/topics'
import { messageProducer } from '../kafka/kafka'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const kafka = new Kafka({
    clientId: "payment-kafka-client-id",
    brokers: ["localhost:9092"]
})

const consumer = kafka.consumer({ groupId: "payment-kafka-group-id" })

app.post("/", async (req: Request, res: Response) => {
    await consumer.connect()
    console.log("Consumer connected");

    await consumer.subscribe({ topics: [PAYMENT_REQUEST], fromBeginning: true })
    console.log("Consumer subscribed");

    await consumer.run({
        eachMessage: async ({ topic, message }) => {
            try {
                console.log("Message----------------");
                const data = JSON.parse(message.value?.toString()!)
                console.log("payment request recieved", data);

                if (req.body.status === "success") {
                    await messageProducer(PAYMENT_SUCCESS, { message: "Payment successfully", data })
                    res.status(200).json({ message: "Payment Successfully" })
                } else {
                    await messageProducer(PAYMENT_FAILED, { message: "Payment failed", data })
                    res.status(400).json({ message: "Payment Failed" })
                }
            } catch (error) {
                res.status(500).json({ message: "Payment failed by server", error })
            } finally {
                consumer.disconnect();
                console.log("Consumer disconnect");
            }
        }
    })
})


app.listen(8000, () => {
    console.log("PAYMENT SERVER RURNIING ON 8000");
})
