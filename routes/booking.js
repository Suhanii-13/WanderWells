const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/booking.js");
const { isLoggedIn } = require("../middleware.js");

router.get("/listings/:id/book", isLoggedIn, bookingController.getBookingForm);
router.post("/listings/:id/book", bookingController.processBooking);
router.post("/book/razorpay/success", bookingController.razorpaySuccess);

module.exports = router;

  