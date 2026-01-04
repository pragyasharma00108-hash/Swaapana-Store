const admin = require('firebase-admin');
const path = require('path');
require('dotenv').config();

let serviceAccount;

// Check if running on Vercel (production) or locally
if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
  // For Vercel: Parse JSON string from environment variable
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
} else if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
  // For local development: Load from file path
  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
  serviceAccount = require(path.resolve(serviceAccountPath));
} else {
  throw new Error('Firebase service account not configured. Set FIREBASE_SERVICE_ACCOUNT_KEY or FIREBASE_SERVICE_ACCOUNT_PATH');
}

// Initialize Firebase Admin SDK (only if not already initialized)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

// Get Firestore instance
const db = admin.firestore();

module.exports = { admin, db };
