const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoriesController');


router.get('/', controller.categoriesGet);

module.exports = router;