import EventEmitter from 'events';
import express from 'express'
import { Kafka } from "kafkajs"


const kafka = new Kafka({
    brokers: ["localhost:9092"],
    clientId: "123",
})


const producer = kafka.producer()
const messageEmitter = new EventEmitter();


const consumer = kafka.consumer({ groupId: "000" });
(async () => {
    await consumer.connect();
    await producer.connect();
    await consumer.subscribe({ topic: "user-topic", fromBeginning: false })
    await consumer.run({
        eachMessage: async ({ message, topic, partition }) => {
            console.log("message", message.value?.toString());
            messageEmitter.emit('messageReceived', JSON.parse(message.value?.toString()!));
        }
    })
})()




const app = express()
// 66b48ae703c827a111d10ea4
app.get('/:id', async (req, res) => {
    console.log("a");
    await producer.send({
        messages: [
            { value: JSON.stringify({ id: req.params.id }) }
        ], topic: "second-topic"
    })
    console.log("Z");

    // await producer.disconnect()
    messageEmitter.once('messageReceived', (data) => {
        res.status(200).json({ message: "User fetch success", data });
    });
    // await producer.disconnect()
    // res.status(200).json({ message: "User fetch success" })
});



app.listen(4000, () => {
    console.log("notes server runing 4000");
})