'use strict';
const sharp = require('sharp');

const makeThumbnail = async (file, thumbname) => {
   //file = req.file.path;
   //thumbname = req.file.filename;
  return  await sharp(file).resize(160, 160).toFile('thumbnails/' + thumbname);

  // TODO: use sharp to create a png thumbnail of 160x160px, use async await
};

module.exports = {
  makeThumbnail,
};