function validateLogin(req, res, next) {
  const { identifier, password } = req.body;
  const errors = {};

  if (!identifier || typeof identifier !== "string") {
    errors.identifier = "Email or phone number is required";
  } else {
    const value = identifier.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!emailRegex.test(value) && !phoneRegex.test(value)) {
      errors.identifier =
        "Enter a valid email address or 10-digit Indian phone number";
    }
  }

  if (!password || typeof password !== "string") {
    errors.password = "Password is required";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  next();
}

module.exports = validateLogin;
