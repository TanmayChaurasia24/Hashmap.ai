import mongoose from "mongoose";

const commentschema = new mongoose.Schema({
    text: {
        type: String,
        trim: true,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Comment', commentschema);