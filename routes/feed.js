const express = require('express');
const feedController = require('../controllers/feed');
const router = express.Router();

router.get('/photo/:cameraId', feedController.getPhoto);

module.exports = router;