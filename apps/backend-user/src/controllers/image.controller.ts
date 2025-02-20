import { Request, Response } from "express";



export const generateContent = async (
  req: Request,
  res: Response
): Promise<any> => {
  const model = process.env.CONTENT_GENERATION_MODEL;
  const { prompt }: { prompt: string } = req.body; // Use proper type for `prompt`

  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/a08822ecd78ffb3acede87da0e234c0e/ai/run/${model}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`, // Use environment variable
          "Content-Type": "application/json", // Missing Content-Type header
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: "You are a friendly assistant that helps write stories",
            },
            {
              role: "user",
              content: `generate the image according to the user prompt do not create extremly detailed image quality and detailing of the image should be medium. user prompt is: ${prompt}`,
            },
          ],
        }),
      }
    );

    // Ensure response is valid
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json(); // Extract response body

    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.error("Error generating content:", error);

    return res.status(500).json({
      success: false,
      message: "Error while generating content",
      error: error.message || "Unknown error",
    });
  }
};





