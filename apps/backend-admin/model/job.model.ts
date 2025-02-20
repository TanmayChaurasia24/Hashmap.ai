import mongoose from "mongoose"

const jobschema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        require: true
    },
    description: {
        type: String,
        trim: true,
        default: "no description provided"
    },
    company: {
        type: String,
        trim: true,
        require: true
    },
    salary: {
        type: String,
        trim: true,
        require: true
    },
    type: {
        type: String,
        trim: true,
        require: true
    },
    location: {
        type: String,
        trim: true,
        require: true,
    },
    applicationurl: {
        type: String,
        trim: true,
        require: true,
        unique: true
    },
    skills: {
        type: String,
        trim: true,
        require: true
    },
    postedby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin"
    }
}, {timestamps: true});

export default mongoose.model('job', jobschema);