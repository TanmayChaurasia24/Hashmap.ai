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
  methods: ["GET", "POST", "PUT"]
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




