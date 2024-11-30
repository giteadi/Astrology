const express = require("express");
const {
  createOrder,
  validatePayment,
} = require("../controllers/paymentController");

const router = express.Router();

// Route to create an order
router.post("/order", createOrder);

// Route to validate a payment
router.post("/order/validate", validatePayment);

module.exports = router;
