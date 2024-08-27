const { kafka } = require("./client");

const init = async () => {
    const consumer = kafka.consumer({ groupId: 'user-1' })
    try {
        console.log('consumer connecting');
        await consumer.connect()
        console.log('consumer connecting successfully');

        await consumer.subscribe({ topics: ["rider-updates"], fromBeginning: true })
        console.log('subscribe successfully');

        await consumer.run({
            eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
                console.log(`[${topic}]: PART:${partition}:`, message.value.toString());
            }
        })
    } catch (error) {
        console.log(error)
    }
}

init()