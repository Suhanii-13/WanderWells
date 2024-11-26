const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const bookingController = require("../controllers/booking.js");
const { isLoggedIn,validateBooking } = require("../middleware.js");

router.get("/listings/:id/book", isLoggedIn, wrapAsync(bookingController.getBookingForm));
router.post("/listings/:id/book",validateBooking, bookingController.processBooking);
router.post("/book/razorpay/success", bookingController.razorpaySuccess);

module.exports = router;

  