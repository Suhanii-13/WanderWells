const mongoose = require ("mongoose");
const Listing = require("./listing.js");
const Schema = mongoose.Schema;

const bookingSchema = new Schema ({
    listingInfo:{
        type:Schema.Types.ObjectId,
        rel:"Listing"
    },
    name:{
        type:String
    },
    email:{
        type:String,
    },
    contact:{
        type:Number,
    },
    count:{
        type:Number
    },
    startDate:{
        type:Date
    },
    endDate:{
        type:Date
    },
    paymentMethod:{
        type:String,
        enum:['razorpay' , 'paypal'],
    }
})
module.exports = mongoose.model("Booking", bookingSchema);