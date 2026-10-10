const { pool } = require("../Database/Connection");

//Function to get user profile using user_id
async function getUser(req, res) {
  return res.status(200).json({ Message: "Hello from user" });
}

//Function to register new user
async function registerUser(req, res) {
  const { fullName, email, phoneNo, password } = req.body;

  if (!fullName || !email || !phoneNo || !password) {
    return res.status(422).json({
      message: "All fields are required",
    });
  }

  try {
    const user = await pool.query(
      `INSERT INTO users (full_name, email, phone_no, password)
        VALUES (?, ?, ?, ?)`,
      [fullName, email, phoneNo, password],
    );

    return res.status(201).json({
      message: "User created successfully",
      userId: user.insertId,
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        message: "Email or phone number already registered",
      });
    }

    console.error("Registration error:", error.message);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

module.exports = { getUser, registerUser };
