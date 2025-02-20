import mongoose from "mongoose"

const adminschema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
},{timestamps: true});

export default mongoose.model('admin', adminschema);