const fs = require('fs');
const path = require('path');
            
const image = '../images/image.jpg';
console.log(typeof image);
exports.getPhoto = (req, res, next) => {
    res.status(200).json({
      photo: [
        {
          imageUrl: image,
          createdAt: new Date()
        }
      ]
    });
  };
  
   
 