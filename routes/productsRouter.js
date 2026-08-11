const express = require('express');
const router = express.Router();
const controller = require('../controllers/productsController');

router.get('/', controller.productsGet);
router.get('/:id', controller.productDetailsGet);

module.exports = router;
