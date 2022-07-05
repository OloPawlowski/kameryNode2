const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const feedRoutes = require('./routes/feed');
const cors = require('cors');
require('dotenv').config({path: '.env'});

const app = express();

 app.use(cors());
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: false }));
 app.use('/images', express.static(path.join(process.env.DIR_PATH)));
 app.use('/feed', feedRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Aplikacja działa na porcie ${process.env.PORT}`)
});