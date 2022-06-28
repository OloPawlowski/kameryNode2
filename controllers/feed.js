const fs = require('fs');
const path = require('path');
const rootDir = require('../lane/path');

//router.get('/files/recent/', (req, res) => {
exports.getPhoto = ( (req, res) => {    
    let date = new Date();
    let year = date.getFullYear();
    let hour = date.getHours();
    // console.log('hour.toString:', hour.toString() + '/');
    let minute = date.getMinutes();
    let month = date.getMonth() + 1;
    if (month < 10) month = '0' + month;
    let day = date.getDate();
    if (day < 10) day = '0' + day;

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
        year + '-' + month + '-' +
        '07' +
        '/001' +
        '/jpg/' +
         '22/' +
        '03/' 
      //  '/54[R][0@0][0].jpg'
    );
    let filePath = path.join(rootDir, im);//  __dirname, '../',
    console.log(filePath);

    // router.get('/files/recent/', (req, res) => {
   // const dirPath = process.env.DIR_PATH; //scieżka do folderu ze zdjęciami
    const dirPath = path.join(rootDir, im); //scieżka do folderu ze zdjęciami
    const getMostRecentFile = (dir) => {  //funkcja zwracająca najnowszy plik korzystając z sortowania
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
      let mostRecentfile = getMostRecentFile(dirPath);
      if (!mostRecentfile) {
        return res.status(404).json({ error: 'Not Found.' }); //w przypadku braku pliku zwracamy 404
      }
      // res.status(200).json({photo: im});
      console.log(mostRecentfile);
      return res.sendFile(dirPath + mostRecentfile.file); //  dirPath + 'images/' + mostRecentfile.file
    } catch (error) {
      return res.status(500).json({ error: 'Something went wrong.' }); //obsługa pozostałych błędów
    }
  });

//});
