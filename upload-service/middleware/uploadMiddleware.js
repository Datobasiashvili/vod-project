const path = require('path');
const multer = require('multer');

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads')); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname);
    }
});

const upload = multer({ 
    storage: fileStorageEngine,
    limits: {
        fileSize: 100 * 1024 * 1024, // Limit to 100MB
    },
    fileFilter: (req, file, cb) => {
        const filetypes = /mp4|mkv|mov|png|jpg|jpeg/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error("Error: File upload only supports video or image formats!"));
    }
});

module.exports = { upload };