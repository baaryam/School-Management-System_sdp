require('dotenv').config();
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/index');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root welcome endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'KM/ST/CENTRAL CAMP G.M.M.S - School Management System API is running.',
    version: '1.0.0',
    documentation: '/api/v1/health',
  });
});

// Mount API routes
app.use('/api/v1', apiRoutes);

// Global Error Handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(` GMMS Server started successfully on port ${PORT}`);
  console.log(` Health Check: http://localhost:${PORT}/api/v1/health`);
  console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`====================================================`);
});
