const Video = require("../models/Video");
const { processVideo } = require("../services/videoProcessor");

const UPLOAD_SERVICE_URL = process.env.UPLOAD_SERVICE_URL || 'http://localhost:5003';

const uploadVideo = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file" });

    const owner = req.headers["x-user-id"];

    const videoEntry = await Video.create({
      title: req.body.title || "Untitled",
      description: req.body.description,
      videoUrl: req.file.path,
      owner: owner,
      status: "pending",
    });

    processVideo(req.file.path, "./uploads")
      .then(async (data) => {
        videoEntry.videoUrl = `${UPLOAD_SERVICE_URL}/uploads/${data.compressedVideo}`;
        videoEntry.thumbnailUrl = `${UPLOAD_SERVICE_URL}/uploads/${data.thumbnail}`;
        videoEntry.status = "processed";
        await videoEntry.save();
      })
      .catch(async (err) => {
        console.error("processVideo failed:", err.message); 
        videoEntry.status = "failed";
        await videoEntry.save();
      });

    res.status(201).json({
      message: "Upload successful. Video is being processed.",
      videoId: videoEntry._id,
    });
  } catch (err) {
    console.log("FULL ERROR:", err);
    res
      .status(500)
      .json({ error: `ERROR MESSAGE IN UPLOAD CONTROLLER: ${err.message}` });
  }
};

module.exports = { uploadVideo };
