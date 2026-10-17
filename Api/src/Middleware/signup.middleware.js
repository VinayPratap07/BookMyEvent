function validateSignup(req, res, next) {
  const { fullName, email, phoneNo, password } = req.body;
  const errors = {};

  // Full name validation
  if (!fullName || typeof fullName !== "string" || !fullName.trim()) {
    errors.fullName = "Full name is required";
  } else if (fullName.trim().length < 3) {
    errors.fullName = "Full name must be at least 3 characters";
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || typeof email !== "string") {
    errors.email = "Email is required";
  } else if (!emailRegex.test(email.trim())) {
    errors.email = "Enter a valid email address";
  }

  // Phone number validation (Indian 10-digit number)
  const phoneRegex = /^[6-9]\d{9}$/;

  if (!phoneNo || typeof phoneNo !== "string") {
    errors.phoneNo = "Phone number is required";
  } else if (!phoneRegex.test(phoneNo.trim())) {
    errors.phoneNo = "Enter a valid 10-digit Indian phone number";
  }

  // Password validation
  if (!password || typeof password !== "string") {
    errors.password = "Password is required";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  // Return validation errors
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  next();
}

module.exports = validateSignup;
