const { db } = require('../config/firebase');
const { v4: uuidv4 } = require('uuid');

/**
 * Create a new store with all 3 sections data
 * POST /api/store
 */
const createStore = async (req, res) => {
  try {
    const { businessDetails, category, storeCustomization } = req.body;

    // Generate unique store ID
    const storeId = uuidv4();

    // Prepare store data with all 3 sections
    const storeData = {
      storeId,
      businessDetails: {
        userName: businessDetails?.userName || '',
        businessName: businessDetails?.businessName || '',
        phoneNumber: businessDetails?.phoneNumber || '',
        businessDescription: businessDetails?.businessDescription || '',
        emailAddress: businessDetails?.emailAddress || '',
        pinCode: businessDetails?.pinCode || '',
        completeAddress: businessDetails?.completeAddress || '',
        languagePreference: businessDetails?.languagePreference || ''
      },
      category: {
        businessType: category?.businessType || ''
      },
      storeCustomization: {
        storeUrl: storeCustomization?.storeUrl || '',
        businessLogo: storeCustomization?.businessLogo || '', // URL string for now
        whatsappNumber: storeCustomization?.whatsappNumber || '',
        upiId: storeCustomization?.upiId || '',
        instagram: storeCustomization?.instagram || '',
        facebook: storeCustomization?.facebook || ''
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Save to Firestore in 'stores' collection
    await db.collection('stores').doc(storeId).set(storeData);

    // Return success response with store ID
    res.status(201).json({
      success: true,
      message: 'Store created successfully',
      data: {
        storeId,
        ...storeData
      }
    });

  } catch (error) {
    console.error('Error creating store:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create store',
      error: error.message
    });
  }
};

/**
 * Get a store by ID
 * GET /api/store/:storeId
 */
const getStoreById = async (req, res) => {
  try {
    const { storeId } = req.params;

    // Get store document from Firestore
    const storeDoc = await db.collection('stores').doc(storeId).get();

    if (!storeDoc.exists) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Store retrieved successfully',
      data: storeDoc.data()
    });

  } catch (error) {
    console.error('Error getting store:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get store',
      error: error.message
    });
  }
};

/**
 * Get all stores
 * GET /api/stores
 */
const getAllStores = async (req, res) => {
  try {
    // Get all stores from Firestore
    const storesSnapshot = await db.collection('stores').orderBy('createdAt', 'desc').get();

    const stores = [];
    storesSnapshot.forEach((doc) => {
      stores.push(doc.data());
    });

    res.status(200).json({
      success: true,
      message: 'Stores retrieved successfully',
      count: stores.length,
      data: stores
    });

  } catch (error) {
    console.error('Error getting stores:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get stores',
      error: error.message
    });
  }
};

module.exports = {
  createStore,
  getStoreById,
  getAllStores
};

