async function adminAuthorization(req, res, next) {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Unauthorized user" });
  }

  next();
}

module.exports = { adminAuthorization };
