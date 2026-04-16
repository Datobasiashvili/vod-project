const mongoose = require("mongoose");

const videoSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    videoUrl: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'processed', 'failed'], default: 'pending' },
    thumbnailUrl: { type: String },
    duration: { type: Number },
    size: { type: Number },
    views: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

const Video = mongoose.model("Video", videoSchema);
module.exports = Video;