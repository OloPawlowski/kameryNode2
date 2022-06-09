//const fs = require('fs');
const path = require('path');

exports.getPhoto = (req, res, next) => {
  let image = 'images/image.jpg';
  res.status(200).json({
    photo: {
      imageUrl: image,
      createdAt: new Date(),
    },
  });
};
