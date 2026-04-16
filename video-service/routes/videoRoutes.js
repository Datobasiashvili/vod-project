const express = require("express");
const router = express.Router();
const { getAllVideos, getVideoById, updateVideo, deleteVideo, incrementViews, getMyVideos } = require('../controllers/videoController');

router.get('/', getAllVideos);
router.get('/my', getMyVideos);   
router.get('/:id', getVideoById);
router.patch('/:id', updateVideo);
router.delete('/:id', deleteVideo);
router.post('/:id/view', incrementViews);

module.exports = router;