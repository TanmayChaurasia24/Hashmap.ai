import { Kafka } from "kafkajs";
import jobModel from "../model/job.model";

const kafka = new Kafka({
    clientId: "admin-service",
    brokers: ["localhost:9092"] 
});

const consumer = kafka.consumer({ groupId: "job-posting-group" });

export const jobsconsumer = async () => {
    await consumer.connect();
    
    await consumer.subscribe({
        topic: "job-postings", 
        fromBeginning: false
    });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            if (message.value) {
                const data = JSON.parse(message.value.toString()); 
                
                console.log(`Received job posting:`, data);

                // try {
                //     await jobModel.create(data);
                //     console.log("Job saved to DB successfully");
                // } catch (err) {
                //     console.error("Error saving job to DB:", err);
                // }
            } else {
                console.warn("Received empty message");
            }
        }
    });
};
