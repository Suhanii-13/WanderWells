if(process.env.NODE_ENV != "production");{
  require('dotenv').config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const cookieParser = require("cookie-parser"); //not used
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const ExpressError = require("./utils/ExpressError.js");
const  {isLoggedIn} = require("./middleware.js");

//for booking 
const Booking = require("./models/book.js");
const Listing = require("./models/listing.js");
const Razorpay = require('razorpay');
const crypto = require('crypto');



//------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);


const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js")
const userRouter = require("./routes/user.js")


app.use(express.static(path.join(__dirname,"/public")))

//razore pay

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
// const dbUrl = process.env.ATLASDB_URL
const MONGO_URL = process.env.Mongodb_url
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  // await mongoose.connect(dbUrl);
  await mongoose.connect( MONGO_URL);

}
// const store =MongoStore.create({
//   mongoUrl:dbUrl,
//   crypto: {
//     secret:process.env.SECRET,
//   },
//   touchAfter:24*3600,
// })

// store.on("error", ()=>{
//   console.log("error mongo session store " , err);
// })
const sessionOption = {
  // store,
  secret:process.env.SECRET, 
  resave:false,
  saveUninitialized:true,
  cookie:
  {
    expires:Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly:true,
  }
}


app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))//authenticate using localstrategy
passport.serializeUser(User.serializeUser());//user info store in session
passport.deserializeUser(User.deserializeUser());//user info delete from one session


app.listen(8080, () => {
  console.log("server is listening to port 8080");
});

app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");//listing.js (index route)
  res.locals.currentUser=req.user;
  next();
})

//for listings 
app.use("/listings" ,listingRouter);

// for review 
app.use("/listings/:id/reviews" ,reviewRouter);

//for users
app.use("/",userRouter);


//book

app.get("/listings/:id/book" ,isLoggedIn,async(req,res)=>{
  try{
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
})

app.post("/listings/:id/book", async (req,res)=>{
     const listingId = req.params.id;
     const newBooking = new Booking(Object.assign({ listingInfo: listingId }, req.body.booking));
     const userId = req.user._id;
     await newBooking.save();
     console.log(newBooking);
     
     const user = await User.findById(userId);
     user.booking.push(newBooking._id);
     await user.save();  

    if(newBooking.paymentMethod == "razorpay")
    {
        res.redirect(`/listings/${listingId}"/book/razorpay`);
    }
})

app.get("/listings/:id/book/razorpay", (req,res)=>{
  res.send("welcome to razorpay");
})

//error handler middleware
app.all("*",(req,res,next)=>{
  next(new ExpressError(404,"Page not Found"));
});

//middleware to handle errr
app.use((err,req,res,next)=>{
  let{statusCode=500,message="Something went wrong"}=err;
//  res.status(statusCode).send(message);
 res.status(statusCode).render("error.ejs",{err});
});
