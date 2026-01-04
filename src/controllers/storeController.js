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

module.exports = {
  createStore
};

