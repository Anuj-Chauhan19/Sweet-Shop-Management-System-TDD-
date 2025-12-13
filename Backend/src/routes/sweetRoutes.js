const express = require('express');
const router = express.Router();

const { getAllSweets } = require('../controllers/sweetController');

router.get('/', getAllSweets);

module.exports = router;