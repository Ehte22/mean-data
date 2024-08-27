import { Kafka } from 'kafkajs'

const kafka = new Kafka({
    clientId: "kafka-js-client-id",
    brokers: ["localhost:9092"]
})

const producer = kafka.producer()

export const messageProducer = async (topic: string, message: any) => {
    try {
        await producer.connect()
        console.log('producer connected');


        await producer.send({
            topic,
            messages: [{
                value: JSON.stringify(message)
            }]
        })
        console.log("message produced");


    } catch (error) {
        console.log('Error in kafka operation', error);
    } finally {
        await producer.disconnect()
    }
}
