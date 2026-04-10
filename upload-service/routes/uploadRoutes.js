const express = require("express");
const router = express.Router();
const { upload } = require("../middleware/uploadMiddleware");
const { validateVideo } = require("../middleware/validateVideo");
const { uploadVideo } = require("../controllers/uploadController");

router.post('/', upload.single("video"), validateVideo, uploadVideo);

module.exports = router;
