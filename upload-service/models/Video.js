const mongoose = require("mongoose");

const videoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    videoUrl: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'processed'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Video = mongoose.model("Video", videoSchema);
module.exports = Video;