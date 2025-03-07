import {Request, Response} from "express"
import job from "../model/job.model"
import jobModel from "../model/job.model";


export const showjobs = async(req: Request, res: Response): Promise<any> => {
    try {
        const response = await job.find();
        return res.status(201).json({
            response
        })
    } catch (error) {
        return res.status(500).json({
            message: "error while fetching all the jobs"
        })
    }
}

export const deletejob = async(req: Request, res: Response): Promise<any> => {
    const jobid = req.headers._id;

    try {
        const response = await jobModel.findByIdAndDelete(jobid);
        
        if(!response) {
            return res.status(404).json({
                message: "job not found"

            })
        }

        return res.status(201).json({
            message: "user deleted success",
            response,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: "error while deleting job"
        })
    }
}
