import {Request, Response} from "express"
import admin from "../model/admin.model"
import bcrypt from "bcryptjs"
import axios from "axios"

export const createAdmin = async(req: Request, res: Response): Promise<any> => {
    const {username,password} = req.body;

    try {
        const response = await admin.findOne({username});
        if(response) {
            return res.status(400).json({message: "Admin already exists"})
        }

        const hashedpass = await bcrypt.hash(password,10);
        console.log("pass hashed!");

        const newadmin = await admin.create({
            username,
            password: hashedpass
        })
        
        return res.status(201).json({
            newadmin
        });
        
    } catch (error: any) {
        return res.status(500).json({
            message: "error occured",
            result: error.message
        })
    }
}

export const login = async(req: Request, res: Response): Promise<any> => {
    const {username,password} = req.body;

    try {
        const response = await admin.findOne({username});
        if(!response) {
            return res.status(400).json({message: "Admin not exists"})
        }

        const hashedpass = await bcrypt.compare(password, response.password);
        if(!hashedpass) {
            return res.status(400).json({message: "Invalid password"})
        }

       
        return res.status(201).json({
            go: "clear to go"
        });
        
    } catch (error: any) {
        return res.status(500).json({
            message: "error occured",
            result: error.message
        })
    }
}

export const allUsers = async(req: Request, res: Response): Promise<any> => {
    try {
        const response = await axios.get("http://localhost:3000/api/auth/all");
        return res.status(200).json(response.data);
    } catch (error: any) {
        return res.status(500).json({
            message: "error occured",
            result: error.message
        })
    }
}