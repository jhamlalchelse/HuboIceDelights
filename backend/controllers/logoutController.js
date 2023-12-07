const User = require('../models/User');

const logoutController = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      return res.sendStatus(204); //not content
    }
    const refreshToken = cookies?.jwt;
    const verifyUser = await User.findOne({ refreshToken });
    if (!verifyUser) {
      res.clearCookie('jwt', {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      res.sendStatus(204);
    }
    verifyUser.refreshToken = '';
    await verifyUser.save();
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    });
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
  }
};

module.exports = logoutController;
