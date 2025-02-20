import express from "express";
import { generateContent } from "../controllers/image.controller";
import { Request, Response } from "express";
import cors from "cors";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

// Configure Multer to handle file uploads
const storage = multer.memoryStorage(); // Store files in memory (RAM)
const upload = multer({ storage });


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const router = express.Router();


router.post('/generate', generateContent);
router.post("/upload", upload.single("image"), async (req: Request, res: Response): Promise<any> => {
   
    //@ts-ignore
    const body: any = await req.body
    console.log("body is: ", body);
    console.log("body is: ", body.image);
    try {
      if (!req.body) {
        return res.status(400).json({ message: "No file uploaded" });
      }
  
      // Convert file buffer to base64 for Cloudinary
      const uploadStr = `data:${req.body.image.mimetype};base64,${req.body.image.buffer.toString("base64")}`;
  
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(uploadStr, {
        folder: "uploads",
      });
  
      return res.status(200).json({
        message: "Upload successful",
        url: result.secure_url, // Cloudinary URL
      });
    } catch (error: any) {
      return res.status(500).json({
        message: "Error while uploading image",
        error: error.message,
      });
    }
  });

export default router