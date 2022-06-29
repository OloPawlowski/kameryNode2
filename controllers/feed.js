const fs = require('fs');
const path = require('path');
const rootDir = require('../lane/path');

//router.get('/files/recent/', (req, res) => {
exports.getPhoto = (req, res) => {

  const cameraId = req.params.cameraId + '/';

  let date = new Date();
  let year = date.getFullYear().toString() + '-';
//  let hour = date.getHours(); 
//  let minute = date.getMinutes();
  let month = date.getMonth() + 1
  if (month < 10) month = '0' + month;
  month = month.toString() +  '-';
  let day = date.getDate();
  if (day < 10) day = '0' + day;

  let pathway = path.join(
    'images/',
      cameraId, 
      year +      
      month +
      '08',
      'pic_001/'
      // '/001',
      // '/jpg/' +
      // '22/' +
      // '03/'
    //  '/54[R][0@0][0].jpg'
  );
  //let filePath = path.join(rootDir, pathway); //  __dirname, '../', pathway
  
  // const dirPath = process.env.DIR_PATH; //scieżka do folderu ze zdjęciami
  const dirPath = path.join(rootDir, pathway); //scieżka do folderu ze zdjęciami
  const getMostRecentFile = (dir) => {    //funkcja zwracająca najnowszy plik korzystając z sortowania
    const files = orderReccentFiles(dir);
    return files.length ? files[0] : undefined;
  };

  const orderReccentFiles = (dir) => { //sortowanie plików po dacie utworzenia, od najnowszego
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
    console.log(pathway);
    let mostRecentfile = getMostRecentFile(dirPath);
    if (!mostRecentfile) {
      return res.status(404).json({ error: 'Not Found.' }); //w przypadku braku pliku zwracamy 404
    }
    // res.status(200).json({photo: pathway});
    return res.sendFile(dirPath + mostRecentfile.file); //  dirPath + 'images/' + mostRecentfile.file
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong.' }); //obsługa pozostałych błędów
  }
};

//});
