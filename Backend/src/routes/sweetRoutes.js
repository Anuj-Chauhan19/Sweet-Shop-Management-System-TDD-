const express = require('express');
const router = express.Router();
const {protect,restrictTo} = require('../middleware/auth')
const { getAllSweets, createSweet , searchSweets, updateSweet, deleteSweet, purchaseSweet , restockSweet} = require('../controllers/sweetController');

router.get('/', getAllSweets);
router.get('/search', searchSweets);
router.post('/', protect, createSweet);
router.put('/:id', protect, updateSweet);
router.delete('/:id', protect, restrictTo('admin'), deleteSweet);
router.post('/:id/purchase', protect, purchaseSweet);
router.post('/:id/restock', protect, restrictTo('admin'), restockSweet);

module.exports = router;