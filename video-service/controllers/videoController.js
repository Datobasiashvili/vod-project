const Video = require("../models/Video");

const getAllVideos = async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query;

        const videos = await Video.find({ status: 'processed' })
            .select('title description thumbnailUrl duration owner createdAt videoUrl')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        const total = await Video.countDocuments({ status: 'processed' });

        res.status(200).json({
            videos,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getVideoById = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id)
            .select('-__v');

        if (!video) return res.status(404).json({ message: "Video not found" });

        if (video.status === 'pending') {
            return res.status(202).json({ 
                message: "Video is still processing",
                videoId: video._id,
                status: video.status
            });
        }

        if (video.status === 'failed') {
            return res.status(422).json({ 
                message: "Video processing failed",
                videoId: video._id,
                status: video.status
            });
        }

        res.status(200).json({ video });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateVideo = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];
        const { title, description } = req.body;

        const video = await Video.findById(req.params.id);
        if (!video) return res.status(404).json({ message: "Video not found" });

        if (video.owner.toString() !== userId) {
            return res.status(403).json({ message: "Forbidden" });
        }

        if (title) video.title = title;
        if (description) video.description = description;
        await video.save();

        res.status(200).json({ video });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteVideo = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];

        const video = await Video.findById(req.params.id);
        if (!video) return res.status(404).json({ message: "Video not found" });

        if (video.owner.toString() !== userId) {
            return res.status(403).json({ message: "Forbidden" });
        }

        await video.deleteOne();

        // TODO: also delete the actual .mp4 and thumbnail files from disk/S3

        res.status(200).json({ message: "Video deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const incrementViews = async (req, res) => {
    try {
        await Video.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
        res.status(200).json({ message: "View counted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getMyVideos = async (req, res) => {
    try {
        const userId = req.headers['x-user-id'];

        const videos = await Video.find({ owner: userId })
            .select('title thumbnailUrl status duration createdAt')
            .sort({ createdAt: -1 });

        res.status(200).json({ videos });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllVideos, getVideoById, updateVideo, deleteVideo, incrementViews, getMyVideos };