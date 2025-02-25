import { Kafka } from "kafkajs";
import jobModel from "../model/job.model";

const kafka = new Kafka({
    clientId: "admin-service",
    brokers: ["localhost:9092"]
});

const consumer = kafka.consumer({ groupId: "job-posting-group" });

export const jobsconsumer = async () => {
    try {
        await consumer.connect();
        console.log("Kafka consumer connected");

        await consumer.subscribe({
            topic: "job-postings",
            fromBeginning: false
        });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                if (!message.value) {
                    console.warn("Received empty message");
                    return;
                }

                try {
                    const data = JSON.parse(message.value.toString());
                    console.log(`Received job posting:`, data);

                    const isValid = await jobModel.findOne({ applicationurl: data.applicationurl });
                    if (isValid) {
                        console.log("Job posting with the same application URL already exists.");
                        return;
                    }

                    await jobModel.create({
                        title: data.title,
                        company: data.company,
                        description: data.description,
                        salary: data.salary,
                        location: data.location,
                        type: data.jobtype,
                        applicationurl: data.applicationurl,
                        skills: data.skills,
                    });

                    console.log("Job saved to DB successfully");
                } catch (err) {
                    console.error("Error processing Kafka message:", err);
                }
            }
        });

    } catch (error) {
        console.error("Error setting up Kafka consumer:", error);
    }
};

