const fs = require('fs');
const path = require('path');
const rootDir = require('../lane/path');

exports.getPhoto = (req, res) => {
  const cameraId = req.params.cameraId + '/';

  const date = new Date();
  const year = date.getFullYear() + '-';
  let month = (date.getMonth() + 1).toString().padStart(2, '0') + '-';
  let day = date.getDate().toString().padStart(2, '0') + '/';
  const yearMonthDay = year + month + day;

  const dirPath = path.join(
    process.env.DIR_PATH,
    cameraId,
    yearMonthDay,
    'pic_001/'
  );

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
