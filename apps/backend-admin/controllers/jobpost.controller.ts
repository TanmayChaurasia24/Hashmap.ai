import {Request, Response} from "express"
import job from "../model/job.model"
import jobModel from "../model/job.model";

export const jobpost = async (req: Request, res: Response): Promise<any> => {
    const {title,description,company,salary,type,location,applicationurl,skills} = req.body;
    
    // console.log(title,description,company,salary,type,location,applicationurl);

    try {
        if(!title || !company || !salary || !type || !location || !applicationurl || !skills) {
            return res.status(400).json({
                message: "incomplete information"
            })
        }

        const ispresent = await job.findOne({applicationurl});
        if(ispresent) {
            return res.status(300).json({
                message: "job posting with same url is already there, try different url"
            })
        }

        console.log("creating job!");
        
        const newjob = await job.create({
            title,
            description,
            company,
            salary,
            type,
            location,
            applicationurl,
            skills
        });

        console.log("job created!");
        
        return res.status(201).json({
            newjob
        })
    } catch (error: any) {
        return res.status(500).json({
            message: "error while posting jobs from admin",
            err: error.message
        })
    }
}
// export const jobpost = async (req: Request, res: Response): Promise<any> => {
//     const { alljobs } = req.body;
  
//     try {
//       if (!alljobs || !Array.isArray(alljobs) || alljobs.length === 0) {
//         return res.status(400).json({
//           message: "Incomplete information: job list is empty or invalid",
//         });
//       }
  
//       console.log("Creating jobs!");
  
//       for (const job of alljobs) {
//         await jobModel.create({
//           title: job.title,
//           description: job.description,
//           company: job.company,
//           salary: job.salary,
//           type: job.type,
//           location: job.location,
//           applicationurl: job.applicationurl,
//           skills: job.skills,
//         });
//       }
  
//       console.log("All jobs created!");
  
//       return res.status(201).json({
//         message: "Jobs successfully created!",
//       });
//     } catch (error: any) {
//       console.error("Error while posting jobs:", error.message);
//       return res.status(500).json({
//         message: "Error while posting jobs from admin",
//         error: error.message,
//       });
//     }
//   };
  

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
