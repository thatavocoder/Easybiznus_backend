const { User } = require('../models');
const { Op } = require('sequelize');
const { generateToken } = require('../utils/helper');
const bcrypt = require('bcrypt');

const createUser = async (userData) => {
    const { email, firstName, lastName, password, phoneNumber: mobileNumber, role } = userData;

     const existingUser = await User.findOne({
          where: {
            [ Op.or ]: [
              { email: email.toLowerCase() },
              ...(mobileNumber ? [ { mobileNumber } ] : [])
            ]
          }
        });
    
        if (existingUser) {
        throw new Error('User already exists with this email or mobile number');
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create user
        const user = await User.create({
          email,
          firstName,
          lastName,
          password: hashedPassword,
          mobileNumber,
          role: role || 'buyer'
        });
    
        // Generate token
        const token = generateToken(user.id);
        return data = {
          user,
          token
        };
    }

    const login = async (userData) => {
        const { email, password } = userData;

    if (!email || !password) {
        throw new Error('Please provide email and password');
       }
   
       const user = await User.findOne({
         where: { email: email.toLowerCase() },
         attributes: { include: [ 'password' ] }
       });
   
       if (!user) {
        throw new Error('Invalid email or password');
       }
   
       const isMatch = await bcrypt.compare(password, user.password);
       if (!isMatch) {
         throw new Error('Invalid email or password');
       }
   
       if (!user.isActive) {
         throw new Error('Account is deactivated. Please contact administrator.');
       }

       await user.update({ lastLogin: new Date() });
   
       const token = generateToken(user.id);

        return {
          user: user.toJSON(),
          token
        };
    }
    module.exports = {
  createUser,
  login
};