import express from "express";
import connectdb from "./db";
import user from "./routes/user.route";
import images from "./routes/image.route"
import jobs from "./routes/job.route"
import blogs from "./routes/blog.route"
import resume from "./routes/resume.route"
import cors from "cors";

const port = 3000;
const app = express();

app.use(express.json());
app.use(cors({
  origin: "*",
}));

connectdb();

app.use("/api/auth", user);
app.use("/api/image", images)
app.use("/api/jobs", jobs)
app.use("/api/blogs", blogs)
app.use("/api/resume", resume)


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});




// import { Request, Response } from "express";
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// export const generateImage = async (
//   req: Request,
//   res: Response
// ): Promise<any> => {
//   const { prompt } = req.body;

//   if (!prompt) {
//     return res.status(400).json({
//       message: "Prompt is required to generate an image.",
//     });
//   }

//   try {
//     const model = client.getGenerativeModel("gemini-1.5-flash");

//     const response = await model.generateContent(prompt, {
//       generationConfig: {
//         response_mime_type: "image/jpeg",
//         // Add other configuration options like negative prompts, number of images etc.
//       },
//     });

//     if (
//       !response ||
//       !response.generated_images ||
//       response.generated_images.length === 0
//     ) {
//       return res.status(500).json({
//         message: "Image generation failed, no image returned.",
//       });
//     }

//     return res.status(200).json({
//       message: "Image generated successfully.",
//       image: response.generated_images[0].image
//     });
//   } catch (error: any) {
//     console.error("Error generating image:", error.message);

//     return res.status(500).json({
//       message: "Error while generating image using Google GenAI API.",
//       error: error.message,
//     });
//   }
// };
