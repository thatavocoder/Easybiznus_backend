const express = require('express');
const router = express.Router();
const {
  validateUserRegistration,
  validateUserLogin,
} = require('../middlewares/validation');

// Import controllers
const {
  registerUser,
  loginUser,
} = require('../controllers/user.controller');


// Public routes
router.post('/register', validateUserRegistration, registerUser);
router.post('/login', validateUserLogin, loginUser);

module.exports = router;