const express = require('express');
const router = express.Router();
const { createStore } = require('../controllers/storeController');

// POST /api/store - Create a new store with all 3 sections
router.post('/store', createStore);

module.exports = router;

