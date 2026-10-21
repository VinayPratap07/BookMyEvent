require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const { connectDB } = require("./Database/Connection");
const {
  authenticationMiddleware,
  forceAuthentication,
} = require("./Middleware/auth.middleware");
const {
  organiserAuthorization,
} = require("./Middleware/authorization.middleware");

//Routes
const userRoutes = require("./Routes/User.Auth.Routes");
const organiserRoutes = require("./Routes/Organiser.Routes");
const showRoutes = require("./Routes/Show.Routes");
const paymentRoutes = require("./Routes/Payment.Routes");

const app = express();
const PORT = process.env.PORT;

//Database connection
connectDB();

//CORS
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(authenticationMiddleware("token"));
app.use(cors(corsOptions));

//Routes
app.use("/api/user", userRoutes);
app.use(
  "/api/organiser",
  forceAuthentication,
  organiserAuthorization,
  organiserRoutes,
);
app.use("/api/show", showRoutes);
app.use("/api/payment", paymentRoutes);

app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});
