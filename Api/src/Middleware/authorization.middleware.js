async function organiserAuthorization(req, res, next) {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Unauthorized user" });
  }

  next();
}

module.exports = { organiserAuthorization };
