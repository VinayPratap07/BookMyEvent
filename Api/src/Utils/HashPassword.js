const bcrypt = require("bcrypt");

//Function that takes user password as input and return hashed password
async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

//Function that takes user password and hashed password and compare it if matches it returns true and false if it doesn't
async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

module.exports = { hashPassword, comparePassword };
