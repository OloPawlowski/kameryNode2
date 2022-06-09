const fs = require('fs');
const path = require('path');

exports.getPhoto = (req, res, next) => {
    res.status(200).json({
      photo: [
        {
         // title: 'First Post',
          imageUrl: 'images/image.jpg',
          createdAt: new Date()
        }
      ]
    });
  };
  
   
 