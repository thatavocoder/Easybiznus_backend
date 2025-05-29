const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
   return typeof password === "string" && password.length >= 8;
};

const validateMobileNumber = (mobile) => {
  const mobileRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return mobileRegex.test(mobile);
};

const validateName = (name) => {
  return name && typeof name === 'string' && name.trim().length >= 2 && name.trim().length <= 50;
};


const validateUserRegistration = (req, res, next) => {
  const { email, firstName, lastName, password, confirmPassword, phoneNumber: mobileNumber, role } = req.body;
  const errors = [];

  if (!email) {
    errors.push('Email is required');
  } else if (!validateEmail(email)) {
    errors.push('Please provide a valid email address');
  }

  if (!firstName) {
    errors.push('First name is required');
  } else if (!validateName(firstName)) {
    errors.push('First name must be between 2 and 50 characters');
  }

  if (!lastName) {
    errors.push('Last name is required');
  } else if (!validateName(lastName)) {
    errors.push('Last name must be between 2 and 50 characters');
  }

  if (!password || !confirmPassword || password !== confirmPassword) {
    errors.push('Password is required and must match confirm password');
  } else if (!validatePassword(password)) {
    errors.push('Password must be at least 8 characters long ');
  }

  if (mobileNumber && !validateMobileNumber(mobileNumber)) {
    errors.push('Please provide a valid mobile number');
  }

  if (role && !['buyer', 'seller'].includes(role)) {
    errors.push('Role must be either buyer or seller');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors
    });
  }

  next();
};

const validateUserLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email) {
    errors.push('Email is required');
  } else if (!validateEmail(email)) {
    errors.push('Please provide a valid email address');
  }

  if (!password) {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation errors',
      errors
    });
  }

  next();
};

// // Validation for profile update
// const validateProfileUpdate = (req, res, next) => {
//   const { firstName, lastName, mobileNumber } = req.body;
//   const errors = [];

//   if (firstName && !validateName(firstName)) {
//     errors.push('First name must be between 2 and 50 characters');
//   }

//   if (lastName && !validateName(lastName)) {
//     errors.push('Last name must be between 2 and 50 characters');
//   }

//   if (mobileNumber && !validateMobileNumber(mobileNumber)) {
//     errors.push('Please provide a valid mobile number');
//   }

//   if (errors.length > 0) {
//     return res.status(400).json({
//       success: false,
//       message: 'Validation errors',
//       errors
//     });
//   }

//   next();
// };

// // Validation for password change
// const validatePasswordChange = (req, res, next) => {
//   const { currentPassword, newPassword } = req.body;
//   const errors = [];

//   if (!currentPassword) {
//     errors.push('Current password is required');
//   }

//   if (!newPassword) {
//     errors.push('New password is required');
//   } else if (!validatePassword(newPassword)) {
//     errors.push('New password must be at least 6 characters long and contain at least one letter and one number');
//   }

//   if (currentPassword && newPassword && currentPassword === newPassword) {
//     errors.push('New password must be different from current password');
//   }

//   if (errors.length > 0) {
//     return res.status(400).json({
//       success: false,
//       message: 'Validation errors',
//       errors
//     });
//   }

//   next();
// };

// // Validation for pagination parameters
// const validatePagination = (req, res, next) => {
//   const { page, limit } = req.query;

//   if (page && (isNaN(page) || parseInt(page) < 1)) {
//     return res.status(400).json({
//       success: false,
//       message: 'Page must be a positive number'
//     });
//   }

//   if (limit && (isNaN(limit) || parseInt(limit) < 1 || parseInt(limit) > 100)) {
//     return res.status(400).json({
//       success: false,
//       message: 'Limit must be a number between 1 and 100'
//     });
//   }

//   next();
// };

// // Validation for user ID parameter
// const validateUserId = (req, res, next) => {
//   const { id } = req.params;

//   if (!id || isNaN(id) || parseInt(id) < 1) {
//     return res.status(400).json({
//       success: false,
//       message: 'Invalid user ID'
//     });
//   }

//   next();
// };

module.exports = {
  validateUserRegistration,
  validateUserLogin,
  validateEmail,
  validatePassword,
  validateMobileNumber,
  validateName
};