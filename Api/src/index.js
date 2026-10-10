require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");

//Routes
const userRoutes = require("./Routes/User.Routes");
const { connectDB } = require("./Database/Connection");

const app = express();
const PORT = process.env.PORT;

//Database connection
connectDB();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});
