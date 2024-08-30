const Listing = require("../models/listing.js");
const Booking = require("../models/book.js");
const User = require("../models/user.js");
const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports.getBookingForm = async (req, res) => {
  try {
    const listingId = req.params.id;
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).send('Listing not found');
    }
    res.render("booking/bookingForm.ejs", {
      listingId,
      amount: listing.price,
      razorpayKeyId: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

module.exports.processBooking = async (req, res) => {
  const listingId = req.params.id;
  const bookingData = Object.assign({ listingInfo: listingId }, req.body.booking);
  if (bookingData.paymentMethod === "razorpay") {
    const amount = bookingData.amount * 100; 
    const options = {
      amount,
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`
    };

    try {
      const order = await razorpay.orders.create(options);
      res.render('booking/razorpayCheckout', {
        listingId,
        bookingData,
        orderId: order.id,
        amount: bookingData.amount,
        bookingData,
        razorpayKeyId: process.env.RAZORPAY_KEY_ID
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating Razorpay order');
    }
  }
};

module.exports.razorpaySuccess = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature, listingId, numberOfPeople, startDate, endDate, name, email } = req.body;
  const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
  hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const generated_signature = hmac.digest('hex');

  if (generated_signature === razorpay_signature) {
    try {
      const newBooking = new Booking({
        listingInfo: listingId,
        user: req.user._id,
        numberOfPeople,
        startDate,
        endDate,
        name,
        email,
        paymentId: razorpay_payment_id, 
      });
      await newBooking.save(); 
      const user = await User.findById(req.user._id);
      user.booking.push(newBooking._id);
      await user.save();
      req.flash("success", "Booking successful");
      res.redirect('/listings');
    } catch (error) {
      console.error(error);
      req.flash("error", "Booking failed");
      res.redirect('/listings');
    }
  } else {
    req.flash("error", "Signature mismatch");
    res.redirect('/listings');
  }
};
