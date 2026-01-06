const express = require('express');
const router = express.Router();
const { createStore, getStoreById, getAllStores } = require('../controllers/storeController');

// POST /api/store - Create a new store with all 3 sections
router.post('/store', createStore);

// GET /api/stores - Get all stores
router.get('/stores', getAllStores);

// GET /api/store/:storeId - Get a single store by ID
router.get('/store/:storeId', getStoreById);

module.exports = router;

