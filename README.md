# Swaapana Store API

A Node.js API for storing business details, category, and store customization data using Firebase Firestore.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env` file** in root directory:
   ```
   FIREBASE_SERVICE_ACCOUNT_PATH=./swaapana-store-firebase-adminsdk-fbsvc-7be6a059f1.json
   PORT=3000
   ```

3. **Run the server:**
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

## API Endpoint

### Create Store
**POST** `/api/store`

**Request Body:**
```json
{
  "businessDetails": {
    "userName": "Pragya Sharma",
    "businessName": "My Store",
    "phoneNumber": "+91 9084301894",
    "businessDescription": "Best local shop",
    "emailAddress": "email@example.com",
    "pinCode": "110001",
    "completeAddress": "Shop address with landmark",
    "languagePreference": "Hindi"
  },
  "category": {
    "businessType": "Local Shop"
  },
  "storeCustomization": {
    "storeUrl": "local-pragya",
    "businessLogo": "https://example.com/logo.png",
    "whatsappNumber": "9068994541",
    "upiId": "pragya@paytm",
    "instagram": "https://instagram.com/yourstore",
    "facebook": "https://facebook.com/yourstore"
  }
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Store created successfully",
  "data": {
    "storeId": "generated-uuid",
    "businessDetails": { ... },
    "category": { ... },
    "storeCustomization": { ... },
    "createdAt": "2026-01-04T...",
    "updatedAt": "2026-01-04T..."
  }
}
```

## Project Structure

```
nodeLearning/
├── src/
│   ├── config/
│   │   └── firebase.js       # Firebase Admin SDK configuration
│   ├── controllers/
│   │   └── storeController.js # Store creation logic
│   ├── routes/
│   │   └── storeRoutes.js    # API routes
│   └── index.js              # Main entry point
├── .env                      # Environment variables
├── .gitignore
├── package.json
└── README.md
```

