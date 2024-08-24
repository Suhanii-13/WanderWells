const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema ({
    name:{
        type:String
    },
    startDate:{
        type:Date
    },
    endDate:{
        type:Date
    },
    people:{
        type:Number
    },
    paymentMethod:{
        type:String,
        enum:['razorpay' , 'paypal'],
    }
})
module.exports = mongoose.model("Booking", bookingSchema);