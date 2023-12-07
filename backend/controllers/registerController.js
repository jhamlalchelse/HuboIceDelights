const User = require('../models/User');
const bcrypt = require('bcrypt');

const registerController = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'username and password required' });
  }
  try {
    const duplicate = await User.findOne({ username });
    if (duplicate) {
      return res.status(409).json({ message: 'username already exist.' }); //Conflict
    }
    const hassPass = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hassPass,
    });
    await user.save();
    res.status(200).json({
      user,
    });
  } catch (error) {
    console.log('Register Error::', error);
    res.status(500).json({
      Error: error,
    });
  }
};

module.exports = registerController;
