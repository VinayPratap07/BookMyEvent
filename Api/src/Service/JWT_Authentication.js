const JWT = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;

//Generates token for user storing their email and id inside the payload
function createTokenForUser(user) {
  const payload = {
    id: user.id,
    email: user.email,
  };

  const token = JWT.sign(payload, SECRET);

  return token;
}

module.exports = { createTokenForUser };
