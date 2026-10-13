const { verifyToken } = require("../Service/JWT_Authentication");

function authenticationMiddleware(cookieValue) {
  return (req, res, next) => {
    const cookie = req.cookies[cookieValue];
    if (!cookie) {
      return next();
    }
    try {
      const userPayload = verifyToken(cookie);
      req.user = userPayload;
    } catch (err) {
      return next();
    }
    next();
  };
}

function forceAuthentication(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized user",
    });
  }
  next();
}

module.exports = { authenticationMiddleware, forceAuthentication };
