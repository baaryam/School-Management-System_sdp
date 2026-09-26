const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');

// Mount modular sub-routers
router.use('/auth', authRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'GMMS - KM/ST/CENTRAL CAMP G.M.M.S API Server',
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
