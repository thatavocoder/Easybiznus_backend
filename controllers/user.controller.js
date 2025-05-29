const {
createUser,
login
} = require ('../services/user.service')

const registerUser = async (req, res, next) => {
  try {
    const data = await createUser(req.body)
    if (!data) {
      return res.status(400).json({
        success: false,
        message: 'User registration failed'
      });
    }

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const data = await login(req.body)
    if (!data) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data
    });
  } catch (error) {
    if (error.message === 'Invalid email or password') {
      return res.status(401).json({
        success: false,
        message: error.message
      });
    }
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser
};