const { kafka } = require("./client");

const init = async () => {
    const producer = kafka.producer()
    try {
        console.log("Connecting Producer");
        await producer.connect()
        console.log("Connecting Producer Successfully");

        await producer.send({
            topic: 'rider-updates',
            messages: [
                {
                    partition: 0,
                    key: 'location-update',
                    value: JSON.stringify({ name: 'John', location: 'WEST' }),
                }
            ]
        })


    } catch (error) {
        console.error("Error in Kafka operation:", error);
    } finally {
        await producer.disconnect()
    }
}

init()