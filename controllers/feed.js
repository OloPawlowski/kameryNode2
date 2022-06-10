//const fs = require('fs');
const path = require('path');

exports.getPhoto = (req, res, next) => {
  let date = new Date();
  let year = date.getFullYear();
  //console.log(year);
  let hour = date.getHours();
 // console.log('hour.toString',hour.toString() + '/');
  let minute = date.getMinutes();
 // console.log(minute);
  let month = date.getMonth();
  month = month + 1;
  if (month < 10) month = '0' + month;
 // console.log(month);

 // console.log('to jest month po dodaniu 1', month);
  let day = date.getDate();
  if (day < 10) day = '0' + day;
 // console.log(day);

  let ten = '03';

  if (minute >= 50) {
    ten = '53';
  } else if (minute >= 40) {
    ten = '43';
  } else if (minute >= 30) {
    ten = '33';
  } else if (minute >= 20) {
    ten = '23';
  } else if (minute >= 10) {
    ten = '13';
  }
  console.log('to jest ten', ten);

  // let im = path.join(
  //   'images/' +
  //     '6J02D05PAG57E44/6J02D05PAG57E44/' +
  //     year + '-' + month + '-' + day +
  //     '/001' +
  //     '/jpg/' +
  //     hour + ten +
  //     '/54[R][0@0][0].jpg'
  // );
  let im = path.join(
    'images/' +
      '6J02D05PAG57E44/6J02D05PAG57E44/' +
      year + '-' + month + '-' + '07' +
      '/001' +
      '/jpg/' +
      '22/' + '03' +
      '/54[R][0@0][0].jpg'
  );
  
  res.status(200).json({
    photo: {
      imageUrl: im,
      createdAt: new Date(),
    },
  });
};
