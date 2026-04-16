const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const fs = require("fs");
const ffmpegStatic = require('ffmpeg-static');

const processVideo = (inputPath, outputFolder) => {
  const filename = path.basename(inputPath, path.extname(inputPath));
  const outputPath = path.join(outputFolder, `${filename}_compressed.mp4`);
  const thumbnailPath = path.join(outputFolder, `${filename}_thumb.png`);
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .setFfmpegPath(ffmpegStatic)
      .screenshots({
        timestamps: ['00:00:01'],
        filename: `${filename}_thumb.png`,
        folder: outputFolder,
        size: '320x240'
      })
      .on('end', () => {
        ffmpeg(inputPath)
          .setFfmpegPath(ffmpegStatic)
          .videoCodec('libx264')
          .size('720x?')
          .on('end', () => {
            console.log('Processing finished!');
            fs.unlink(inputPath, (err) => {
              if (err) console.error(`Error deleting raw file: ${err}`);
              else console.log(`Successfully deleted raw file: ${inputPath}`);
            });
            resolve({
              compressedVideo: `${filename}_compressed.mp4`,
              thumbnail: `${filename}_thumb.png`
            });
          })
          .on('error', (err) => {
            console.error('Compression error:', err);
            reject(err);
          })
          .save(outputPath);
      })
      .on('error', (err) => {
        console.error('Thumbnail error:', err);
        reject(err);
      });
  });
};

module.exports = { processVideo };
