import { Request, Response } from "express";

export const generateResumeContent = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { userDetail, jobDescription } = req.body;
  const model = process.env.RESUME_GENERATION_MODEL;
  const maxTokens = 2048; 

  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/a08822ecd78ffb3acede87da0e234c0e/ai/run/${model}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant",
            },
            {
              role: "user",
              content: `
                User details: ${userDetail}  
                Job description: ${jobDescription} 
                Create an ATS-friendly resume based on the given user details and job description in JSON format.  
                - Use numbers while writing project descriptions or work experience where applicable. If numbers are already provided, do not modify them.  
                - Ensure the resume is well-structured, with clear sections for experience, education, skills, projects, and certifications.  
                - Optimize the content with relevant keywords from the job description to increase ATS compatibility.  
                - Maintain a professional and concise tone.  
                You can use any amount of tokens necessary, but ensure the content is high-quality and ATS-optimized.`,
            },
          ],
          max_tokens: maxTokens, // Adding max_tokens to limit response length
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();

    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    return res.status(500).json({
      message: "Error in generating resume",
      error: error.message,
    });
  }
};
