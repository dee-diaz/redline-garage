const express = require('express');
const router = express.Router();
const controller = require('../controllers/brandsController');

router.get('/', controller.brandsGet);

module.exports = router;