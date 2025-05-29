const express = require('express');
const router = express.Router();
const userRoutes = require('./user.routes');

// Use routes
router.use('/user', userRoutes);


module.exports = router;