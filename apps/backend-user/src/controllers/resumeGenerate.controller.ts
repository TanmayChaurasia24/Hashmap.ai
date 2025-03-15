import { Request, Response } from "express";
import { ContentGenPromptResume } from "../lib/prompt/ContentGenResume";

export const generateResumeContent = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userDetail, jobDescription } = req.body;
  try {
    if(!userDetail || !jobDescription) {
      return res.status(400).json({ message: "Please provide user details and job description"});
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        // "HTTP-Referer": "<YOUR_SITE_URL>", // Optional. Site URL for rankings on openrouter.ai.
        // "X-Title": "<YOUR_SITE_NAME>", // Optional. Site title for rankings on openrouter.ai.
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "google/gemma-3-4b-it:free",
        "messages": [
          {
            "role": "user",
            "content": [
              {
                "type": "text",
                "text": () => ContentGenPromptResume(userDetail, jobDescription)
              },
              // {
              //   "type": "image_url",
              //   "image_url": {
              //     "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg"
              //   }
              // }
            ]
          }
        ]
      })
    });

    if(!response) {
      return res.status(500).json({ message: "Failed to generate resume content" });
    }

    return res.status(201).json({
      "status": "success",
      "data": response.json(),
    })
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      message: "error while generating content from openrouter api"
    })
  }
};
