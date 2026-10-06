const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Hello from server" });
});

app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});
