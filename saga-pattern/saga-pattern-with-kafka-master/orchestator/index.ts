import { Kafka } from "kafkajs"
import { ORDER_FAILED, ORDER_REQUEST, ORDER_SUCCESS, PAYMENT_FAILED, PAYMENT_REQUEST, PAYMENT_SUCCESS, STOOCK_FAILED, STOOCK_REQUEST, STOOCK_SUCCESS } from "../kafka/topics";
import { produceMessage } from "../kafka/kafka";

const kafka = new Kafka({
    clientId: "orchestator-kafka-client-id",
    brokers: ["localhost:9092"]
})

const consumer = kafka.consumer({ groupId: "orchestator-kafka-group-id" });

(async () => {
    await consumer.connect()

    await consumer.subscribe({ topics: [ORDER_REQUEST, STOOCK_SUCCESS, STOOCK_FAILED, PAYMENT_SUCCESS, PAYMENT_FAILED], fromBeginning: false })

    await consumer.run({
        eachMessage: async ({ topic, message }) => {
            const data = JSON.parse(message.value?.toString()!)
            console.log("TOPIC IN ORCHESTATOR", topic, "====><====", data);

            if (topic === ORDER_REQUEST) {
                await produceMessage(STOOCK_REQUEST, data)
            } else if (topic === STOOCK_SUCCESS) {
                console.log("payment request producing");
                await produceMessage(PAYMENT_REQUEST, { message: data })
                console.log("payment request produced");
            } else if (topic === STOOCK_FAILED) {
                await produceMessage(ORDER_FAILED, { message: "Out of stock" })
            } else if (topic === PAYMENT_SUCCESS) {
                console.log("order success producing");
                await produceMessage(ORDER_SUCCESS, { message: data });
                console.log("order success produced");
            } else if (topic === PAYMENT_FAILED) {
                console.log("order failed producing");
                await produceMessage(ORDER_FAILED, { message: data })
                console.log("order failed produced");
            }

        }
    })

})()