const Joi = require('joi');
const Listing = require('./models/listing');
const Review = require('./models/review.js');
module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        price: Joi.number().required().min(0),
        image: Joi.string().allow("", null),
    }).required()
});
module.exports.reviewSchema = Joi.object({
    review:Joi.object({
    rating:Joi.number().required().min(1).max(5),
        comment:Joi.string().required(),
    }).required()
})
module.exports.bookingSchema=Joi.object({
    booking:Joi.object({
        name:Joi.string().required(),
        email:Joi.string().required(),
        count:Joi.number().required(),
        startDate:Joi.date().required(),
        endDate:Joi.date().required(),
        paymentMethod: Joi.string().valid('razorpay', 'paypal').required(),
        amount: Joi.number().positive().required(),
        listingId: Joi.string().required()
    }).required()
})