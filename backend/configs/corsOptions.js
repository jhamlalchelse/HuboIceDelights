const allowedOrigins = require("./allowOrigins");

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Cors Not Allowed!"));
    }
  },
  credentials: true, // Allow cookies to be sent in cross-origin requests
  optionSuccessStatus: 200,
};

module.exports = corsOptions;