const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
require("dotenv").config();

const userRoutes = require("./routes/userRoutes"); 
const cartRoutes = require("./routes/cartRoutes");
const paymentRoutes = require("./routes/paymentRoutes"); 
const cloudinaryConnect = require("./config/cloudinary");

const app = express();
const port = process.env.PORT || 4001;

// Initialize Cloudinary connection
cloudinaryConnect();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

// Integration of routes
app.use("/api/v1/user", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/payments", paymentRoutes); // Integrate Razorpay routes

// Root route
app.get("/", (req, res) => {
  res.send(`<h1> Say Hello To Astrology..</h1>`);
});

// Server listener
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
