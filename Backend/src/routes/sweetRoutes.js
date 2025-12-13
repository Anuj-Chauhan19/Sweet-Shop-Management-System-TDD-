const express = require('express');
const router = express.Router();
const {protect,restrictTo} = require('../middleware/auth')
const { getAllSweets, createSweet , searchSweets, updateSweet, deleteSweet} = require('../controllers/sweetController');

router.get('/', getAllSweets);
router.get('/search', searchSweets);
router.post('/', protect, createSweet);
router.put('/:id', protect, updateSweet);
router.delete('/:id', protect, restrictTo('admin'), deleteSweet);

module.exports = router;