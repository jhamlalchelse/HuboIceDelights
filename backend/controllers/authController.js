const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'username and password required' });
  }
  try {
    const foundUser = await User.findOne({ username });
    if (!foundUser) {
      return res.sendStatus(401);
    }
    const matchPwd = await bcrypt.compare(password, foundUser.password);
    if (!matchPwd) {
      return res.sendStatus(401);
    }
    const roles = Object.values(foundUser.roles)?.filter(Boolean);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '15s',
      }
    );
    const refreshToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
        },
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: '10m',
      }
    );
    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      roles,
      accessToken,
    });
  } catch (error) {
    res.status(500).json({
      Error: error,
    });
  }
};

module.exports = authController;
