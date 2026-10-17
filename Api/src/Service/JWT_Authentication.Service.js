const JWT = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;

//Generates token for user storing their email and id inside the payload
function createTokenForUser(user) {
  const payload = {
    id: user.user_id,
    email: user.email,
  };

  const token = JWT.sign(payload, SECRET);

  return token;
}

function verifyToken(token) {
  const payload = JWT.verify(token, SECRET);
  return payload;
}

module.exports = { createTokenForUser, verifyToken };
