import { Request, Response } from "express";
import axios from "axios"

export const fetchAllJobs = async (req: Request, res: Response): Promise<any> => {
    try {
        const response = await axios.get("http://localhost:8000/api/jobs/showall");

        if(!response) {
            return res.status(500).json({
                message: "Failed to fetch jobs"
            })
        }

        return res.status(201).json({
            message: "Jobs fetched successfully",
            data: response.data
        })
    } catch (error) {
        return res.status(500).json({
            message: "Error fetching all jobs",
        })
    }
}