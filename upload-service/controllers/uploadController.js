const Video = require("../models/Video");
const { processVideo } = require("../services/videoProcessor");

const uploadVideo = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No file" });

        const owner = req.headers["x-user-id"];
        
        const videoEntry = await Video.create({
            title: req.body.title || "Untitled",
            videoUrl: req.file.path,
            owner: owner,
            status: 'pending'
        });

        processVideo(req.file.path, './uploads')
            .then(async (data) => {
                videoEntry.videoUrl = data.compressedVideo;
                videoEntry.thumbnailUrl = data.thumbnail;
                videoEntry.status = 'processed';
                await videoEntry.save();
            });

        res.status(201).json({ 
            message: "Upload successful. Video is being processed.",
            videoId: videoEntry._id 
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { uploadVideo }