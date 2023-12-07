const User = require('../models/User');

const getAllUsers = async (req, res) => {
  console.log('users::');
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

module.exports = getAllUsers;
