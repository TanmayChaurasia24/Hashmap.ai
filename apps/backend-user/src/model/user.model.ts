import mongoose from "mongoose";

const usermodel = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
      $regex: "\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*",
    },
    password: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      require: true,
      unique: true,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    skills: [
      {
        name: {
          type: String,
          trim: true,
        },
        level: {
          type: String,
          trim: true,
        },
      },
    ],
    profilepic: {
      type: String,
      default: " ",
    },
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
    appliedJobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
    location: {
      type: String,
      trim: true,
    },
    education: [
      {
        degree: { type: String, trim: true },
        school: { type: String, trim: true },
        duration: { type: String, trim: true },
      },
    ],
    experience: [
      {
        company: { type: String, trim: true },
        position: { type: String, trim: true },
        duration: { type: String, trim: true },
        description: { type: String, trim: true },
      },
    ],
    socialLinks: {
      linkedin: { type: String, trim: true },
      github: { type: String, trim: true },
      portfolio: { type: String, trim: true },
    },
    certifications: [
      {
        title: { type: String, trim: true },
        issuer: { type: String, trim: true },
        date: { type: Date },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", usermodel);
