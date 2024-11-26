const Listing = require("../models/listing.js");

//index route 
module.exports.index = async (req, res) => {
    let alllisting = await Listing.find({})//schema
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
  let listing = await Listing.findById(id);
  if (!listing) {
      req.flash("error", "Listing not found");
      return res.redirect("/listings");
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

  //search city
  module.exports.searchListings = async (req, res) => {
    const city = req.query.city;
    console.log(req.query)
    try {
       let alllisting = await Listing.find({ location: city });
      if (alllisting.length === 0) {
        req.flash("error", "No listings found with this location");
      }
      res.render('listings/index', { alllisting, searchCity: '' });
    } catch (error) {
      console.error(error);
      req.flash("error", "An error occurred while searching");
      res.redirect('/listings');
    }
  };

  //filter
module.exports.filterByCategory = async (req, res) => {
  const { category } = req.query; 
  let query = {};
  if (category && category !== 'All') {
    query.category = category;
  }
  try {
    const alllisting = await Listing.find(query);
    res.render('listings/index', { alllisting, category }); 
  } catch (err) {
    console.error(err);
    res.redirect('/');
  }
}
