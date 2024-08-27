const { Kafka } = require("kafkajs")

const kafka = new Kafka({
    clientId: 'kafka-basic',
    brokers: ["localhost:9092"]
})
const consumer = kafka.consumer({ groupId: 'user-id' })

const init = async () => {
    try {
        console.log("Consumer connecting");
        await consumer.connect()
        console.log("Consumer connecting successfully");

        await consumer.subscribe({ topic: "rider-updates", fromBeginning: true })
        console.log("Subscribe successfully");

        await consumer.run({
            eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
                const data = JSON.parse(message.value.toString())
                console.log(topic, partition, data);
            }
        })

    } catch (error) {
        console.log('Error in kafka operation', error);
    }
}

init()