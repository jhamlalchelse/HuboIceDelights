const verifyRoles = (...roles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401);
    const userRoles = [...roles];
    const validUser = req.roles
      .map((role) => userRoles.includes(role))
      .find((val) => val === true);

    if (!validUser) return res.sendStatus(401);
    next();
  };
};

module.exports = verifyRoles;
