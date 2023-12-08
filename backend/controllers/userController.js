const User = require('../models/User');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password -refreshToken');
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

module.exports = getAllUsers;
