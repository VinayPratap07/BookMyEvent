async function getUser(req, res) {
  return res.status(200).json({ Message: "Hello from user" });
}

module.exports = { getUser };
