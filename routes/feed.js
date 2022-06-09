const express = require('express');
const feedController = require('../controllers/feed');
const router = express.Router();

router.get('/photo', feedController.getPhoto);

module.exports = router;