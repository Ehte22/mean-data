const { Kafka } = require("kafkajs")

exports.kafka = new Kafka({
    clientId: 'kafka-first-app',
    brokers: ["192.168.0.131:9092"]
})