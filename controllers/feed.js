const fs = require('fs');
const path = require('path');
const rootDir = require('../lane/path');

exports.getPhoto = (req, res) => {
  const cameraId = req.params.cameraId + '/';

  const date = new Date();
  const year = date.getFullYear() + '-';
  let month = date.getMonth() + 1;
  month = 6;
  if (month < 10) month = '0' + month;
  month +=  '-';
  let day = date.getDate() + '/';
  day = 8;
  if (day < 10) day = '0' + day + '/';
  const YearMonthDay = year + month + day;

  const pathway = path.join('images/', cameraId, YearMonthDay, 'pic_001/');
  const dirPath = process.env.DIR_PATH + pathway;
  //const dirPath = path.join(rootDir, pathway);
  console.log(dirPath);

  const getMostRecentFile = (dir) => {
    const files = orderReccentFiles(dir);
    return files.length ? files[0] : undefined;
  };

  const orderReccentFiles = (dir) => {
    return fs
      .readdirSync(dir)
      .filter((file) => fs.lstatSync(path.join(dir, file)).isFile())
      .map((file) => ({
        file,
        mtime: fs.lstatSync(path.join(dir, file)).mtime,
      }))
      .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
  };

  try {
    let mostRecentfile = getMostRecentFile(dirPath);
    if (!mostRecentfile) {
      return res.status(404).json({ error: 'Not Found.' });
    }
   return res.sendFile(dirPath + mostRecentfile.file);
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong.' });
  }
};
