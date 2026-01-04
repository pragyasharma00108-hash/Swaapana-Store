const express = require('express');
const cors = require('cors');
require('dotenv').config();

const storeRoutes = require('./routes/storeRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', storeRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Swaapana Store API is running!',
    endpoints: {
      createStore: 'POST /api/store'
    }
  });
});

// Start server (only in development, Vercel handles this in production)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`📦 Create Store API: POST http://localhost:${PORT}/api/store`);
  });
}

// Export for Vercel
module.exports = app;

