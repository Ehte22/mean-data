const { kafka } = require('./client')

const init = async () => {
    const admin = kafka.admin()
    try {
        console.log("Admin connecting...");
        await admin.connect();
        console.log("Admin Connection Success...");

        console.log("Creating Topic [rider-updates]...");
        await admin.createTopics({
            topics: [
                {
                    topic: 'rider-updates',
                    numPartitions: 2
                }
            ]
        });
        console.log("Topic Created Successfully [rider-updates]");
    } catch (error) {
        console.error("Error in Kafka operation:", error);
    } finally {
        console.log("Disconnecting Admin...");
        await admin.disconnect();
        console.log("Admin Disconnected");
    }
}

init()