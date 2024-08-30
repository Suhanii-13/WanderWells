const Listing = require("../models/listing.js");
const Booking = require("../models/book.js");

//index route 
module.exports.index = async (req, res) => {
    let alllisting = await Listing.find({})//schema
    // let booking = await Booking.find({});
    res.render("listings/index.ejs",{alllisting});
 };


//new route
module.exports.renderNewForm = (req,res)=>{
     res.render("listings/new.ejs");
};

//create route
module.exports.createListing = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);   
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  console.log(newListing);
  await newListing.save();
  
  req.flash("success" , "New Listing Created");
  res.redirect("/listings");
};

//show route
module.exports.showListing = async (req,res)=>{
    let {id} = req.params;
    const listing =await Listing.findById(id).populate({path:"reviews", populate:{
      path:"author",
    }}).populate("owner");
    if(!listing)
      {
        req.flash("error","Listing you requested does not exist");
        res.redirect("/listings")
      }
    res.render("listings/show.ejs",{listing});
 };


 //edit route
module.exports.renderEditForm = async (req,res)=>{
    let {id} = req.params;
    const listing =await Listing.findById(id);
    if(!listing)
     {
       req.flash("error","Listing you requested does not exist");
       res.redirect("/listings")
     }

     let originalImgUrl = listing.image.url;
     originalImgUrl = originalImgUrl.replace("/upload" , "/upload/h_250,w_250")
    res.render("listings/edit.ejs",{listing,originalImgUrl});
  };

//update route
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let result = { ...req.body.listing };
  const { latitude, longitude } = result;
  let listing = await Listing.findById(id);
  if (!listing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listings");
  }
  Object.assign(listing, result);
  if (latitude && longitude) {
      listing.geometry = {
          type: "Point",
          coordinates: [parseFloat(longitude), parseFloat(latitude)]
      };
  }
  if (typeof req.file !== "undefined") {
      let url = req.file.path;
      let filename = req.file.filename;
      listing.image = { url, filename };
  }
  await listing.save();
  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
};



//destroy route
 module.exports.destroyListing = async(req,res)=>{
    let {id}=req.params;
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success","Listing Deleted");
    res.redirect("/listings");
  }