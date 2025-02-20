import { Request, Response } from "express";
import post from "../model/blog.model"

export const createBlog = async (req: Request, res: Response): Promise<any> => {
    const data = req.body;
    
    const title = data.title;
    const content = data.content;
    const thumbnail = data.thumbnail;
    const author = data.author;

    console.log("inside the create blog func backend");
    
    try {
        console.log(data)
        if(!title || !content) {
            return res.status(400).json({message: "Please fill in all fields."})
        }

        if(!author) {
            return res.status(400).json({message: "author not provided"})
        }

        console.log("creating blog post");
        
        const toSavePost = await post.create({
            title: title,
            content: content,
            thumbnail: thumbnail,
            author: author,
            date: Date.now(),
        })

        console.log("created...");
        
        return res.status(201).json({
            ok: "blog post saved success",
            post: toSavePost
        })
        
    } catch (error: any) {
        return res.status(500).json({
            message: "Error creating blog",
            error: error.message
        })
    }
}

export const fetchAllBlog = async (req: Request, res: Response): Promise<any> => {
    try {
        const response = await post.find();
        if(!response) {
            return res.status(404).json({message: "No blog posts found."})
        }
        return res.status(201).json({
            success: "true",
            data: response
        })
    } catch (error: any) {
        return res.status(500).json({
            message: "error while fetching all the blogs",
            error: error.message
        })
    }
}