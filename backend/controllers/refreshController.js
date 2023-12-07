const jwt = require('jsonwebtoken');
const User = require('../models/User');

const refreshController = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies?.jwt;

    const verifyUser = await User.findOne({ refreshToken }).exec();
    if (!verifyUser) return res.sendStatus(403); //forbidden

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error, decoded) => {
        if (error || verifyUser.username !== decoded.UserInfo.username)
          return res.sendStatus(403); //forbidden
        const roles = Object.values(verifyUser.roles).filter(Boolean);
        const accessToken = jwt.sign(
          {
            UserInfo: {
              username: verifyUser.username,
              roles,
            },
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: '15s',
          }
        );
        res.status(200).json({
          roles,
          accessToken,
        });
      }
    );
  } catch (error) {
    console.error(error);
  }
};

module.exports = refreshController;
