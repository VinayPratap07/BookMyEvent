require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const { connectDB } = require("./Database/Connection");
const { authenticationMiddleware } = require("./Middleware/auth_middleware");

//Routes
const userRoutes = require("./Routes/User.Routes");
const adminRoutes = require("./Routes/Admin.Routes");

const app = express();
const PORT = process.env.PORT;

//Database connection
connectDB();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(authenticationMiddleware("token"));

//Routes
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});
