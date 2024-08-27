const { Kafka } = require("kafkajs")

const kafka = new Kafka({
    clientId: 'kafka-basic-tyuiojyhgfghjm',
    brokers: ["localhost:9092"]
})

const producer = kafka.producer()
const init = async () => {
    try {
        console.log("producer connecting");
        await producer.connect()
        console.log("producer connected successfully");

        await producer.send({
            topic: 'rider-updates',
            messages: [
                {
                    value: JSON.stringify({ name: 'John' + `${Math.floor(Math.random() * 100)}`, location: 'WEST' })
                }
            ]
        })
        console.log("Message produced");

    } catch (error) {
        console.log('Error in kafka operation', error);
    } finally {
        await producer.disconnect()
    }
}

init()