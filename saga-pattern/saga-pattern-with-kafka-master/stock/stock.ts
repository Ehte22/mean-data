import express, { Request, Response } from "express"
import mongoose from "mongoose"
import { Kafka } from "kafkajs"
import { STOOCK_FAILED, STOOCK_REQUEST, STOOCK_SUCCESS } from "../kafka/topics"
import { produceMessage } from "../kafka/kafka"

const app = express()

app.use(express.json())

const kafka = new Kafka({
    clientId: "stock-kafka-client-id",
    brokers: ["localhost:9092"]
})

const Products = mongoose.model("products", new mongoose.Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
}, { timestamps: true }));

app.post("/add-product", async (req: Request, res: Response) => {
    const result = await Products.create(req.body);
    res.status(201).json({ message: "Product added success", result })
})

const consumer = kafka.consumer({ groupId: "stock-kafka-group-id" });

(async () => {
    await consumer.connect()

    await consumer.subscribe({ topics: [STOOCK_REQUEST], fromBeginning: false })

    await consumer.run({
        eachMessage: async ({ topic, message }) => {
            try {
                const data = JSON.parse(message.value?.toString()!)
                console.log("data", data);
                const productId = data.productId
                console.log("productId", productId);

                const result = await Products.findById(productId)
                if (result && result.stock >= +data.stock) {
                    await produceMessage(STOOCK_SUCCESS, { data, result })
                } else {
                    await produceMessage(STOOCK_FAILED, { data, result })
                }
            } catch (error) {
                await produceMessage(STOOCK_FAILED, { error: "Unable to check stock" })
            }
        }
    })

})()


mongoose.connect("mongodb://localhost:27017/saga");
mongoose.connection.once("open", () => {
    console.log("MONGOOSE CONNECTED");
    app.listen(4000, () => {
        console.log("STOCK SERVER RUNNING ON 4000");
    })

});

``
