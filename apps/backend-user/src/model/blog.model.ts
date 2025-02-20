import mongoose from "mongoose";

const blogschema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    thumbnail: {
        type: String,
    },
    author: {
        type: String,
        trim: true,
        require: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Post", blogschema)