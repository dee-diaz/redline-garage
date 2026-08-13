const express = require('express');
const router = express.Router();
const controller = require('../controllers/wishlistController');

router.get('/', controller.wishlistGet);
router.post('/', controller.wishlistPost);
router.delete('/', controller.wishlistDelete);

module.exports = router;
