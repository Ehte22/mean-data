import { Kafka } from 'kafkajs'

const kafka = new Kafka({
    clientId: "kafka-js-client-id",
    brokers: ["localhost:9092"]
})

const producer = kafka.producer()

export const produceMessage = async (topic: string, message: any) => {
    try {
        await producer.connect()
        console.log("PRODUCER CONNECTED");


        await producer.send({
            topic,
            messages: [{ value: JSON.stringify(message) }]
        })

    } catch (error) {
        console.log("PRODUCER CONNECTION ERROR", error);
    } finally {
        await producer.disconnect()
        console.log("PRODUCER DISCONNECTED");

    }
}