const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/auth')
const { getAllSweets, createSweet } = require('../controllers/sweetController');

router.get('/', getAllSweets);
router.post('/', protect, createSweet);

module.exports = router;