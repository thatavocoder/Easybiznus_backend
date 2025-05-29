// Explicitly require pg before other modules to ensure it's available
require('pg');

const app = require('../app');

// Export the Express app for Vercel
module.exports = app; 