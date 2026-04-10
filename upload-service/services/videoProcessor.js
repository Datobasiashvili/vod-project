const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

const processVideo = (inputPath, outputFolder) => {
    const filename = path.basename(inputPath, path.extname(inputPath));
    const outputPath = path.join(outputFolder, `${filename}_compressed.mp4`);
    const thumbnailPath = path.join(outputFolder, `${filename}_thumb.png`);

    return new Promise((resolve, reject) => {
        ffmpeg(inputPath)
            .setFfmpegPath('/usr/bin/ffmpeg')
            .screenshots({
                timestamps: ['00:00:01'],
                filename: `${filename}_thumb.png`,
                folder: outputFolder,
                size: '320x240'
            })
            .videoCodec('libx264') 
            .size('720x?')         
            .on('end', () => {
                console.log('Processing finished!');
                
                fs.unlink(inputPath, (err) => {
                    if (err) console.error(`Error deleting raw file: ${err}`);
                    else console.log(`Successfully deleted raw file: ${inputPath}`);
                });
                
                resolve({ 
                    compressedVideo: outputPath, 
                    thumbnail: thumbnailPath 
                });
            })
            .on('error', (err) => {
                console.error('Error during FFmpeg processing:', err);
                reject(err);
            })
            .save(outputPath);
    });
};

module.exports = { processVideo };