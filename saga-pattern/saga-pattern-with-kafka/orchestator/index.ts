import { Kafka } from 'kafkajs'
import { ORDER_FAILED, ORDER_REQUEST, ORDER_SUCCESS, PAYMENT_FAILED, PAYMENT_REQUEST, PAYMENT_SUCCESS } from '../kafka/topics';
import { messageProducer } from '../kafka/kafka';

const kafka = new Kafka({
    clientId: "orchestator-kafka-client-id",
    brokers: ["localhost:9092"]
})

const consumer = kafka.consumer({ groupId: "orchestator-kafka-group-id" });

(async () => {
    try {
        await consumer.connect()
        console.log("consumer connected successfully");

        await consumer.subscribe({ topics: [ORDER_REQUEST, PAYMENT_SUCCESS, PAYMENT_FAILED], fromBeginning: true })

        await consumer.run({
            eachMessage: async ({ topic, message }) => {
                const data = JSON.parse(message.value?.toString()!)
                console.log("TOPIC IN ORCHESTATOR", topic, "====><====", data);

                if (topic === ORDER_REQUEST) {
                    await messageProducer(PAYMENT_REQUEST, { message: data })
                } else if (topic === PAYMENT_SUCCESS) {
                    console.log("order success producing");
                    await messageProducer(ORDER_SUCCESS, { message: data })
                    console.log("order success produced");
                } else if (topic === PAYMENT_FAILED) {
                    console.log("order failed producing");
                    await messageProducer(ORDER_FAILED, { message: data })
                    console.log("order failed produced");
                }
            }
        })

    } catch (error) {
        console.log("Orchestator error", error);

    }
})()