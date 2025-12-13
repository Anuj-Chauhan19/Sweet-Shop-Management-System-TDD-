const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/auth')
const { getAllSweets, createSweet , searchSweets, updateSweet} = require('../controllers/sweetController');

router.get('/', getAllSweets);
router.get('/search', searchSweets);
router.post('/', protect, createSweet);
router.put('/:id', protect, updateSweet);

module.exports = router;