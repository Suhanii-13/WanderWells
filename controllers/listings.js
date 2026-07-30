const Listing = require("../models/listing.js");

//index route 
module.exports.index = async (req, res) => {
    let alllisting = await Listing.find({})
    res.render("listings/index.ejs", { alllisting });
};


//new route
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

//create route
module.exports.createListing = async (req, res, next) => {
  let url, filename;
  if (req.file) {
    // Local storage path → serve as /uploads/filename
    url = `/uploads/${req.file.filename}`;
    filename = req.file.filename;
  } else {
    url = "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&auto=format&fit=crop";
    filename = "default";
  }
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

//show route
module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({
      path: "reviews",
      populate: { path: "author" }
    }).populate("owner");
    if (!listing) {
      req.flash("error", "Listing you requested does not exist");
      return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
};

//edit route
module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", "Listing you requested does not exist");
      return res.redirect("/listings");
    }
    let originalImgUrl = listing.image.url;
    // Only apply Cloudinary transform if it's a Cloudinary URL
    if (originalImgUrl && originalImgUrl.includes("cloudinary")) {
      originalImgUrl = originalImgUrl.replace("/upload", "/upload/h_250,w_250");
    }
    res.render("listings/edit.ejs", { listing, originalImgUrl });
};

//update route
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });
  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }
  if (req.file) {
    let url = `/uploads/${req.file.filename}`;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

//destroy route
module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};

//search city
module.exports.searchListings = async (req, res) => {
    const city = req.query.city;
    try {
      let alllisting = await Listing.find({
        $or: [
          { location: { $regex: city, $options: 'i' } },
          { country: { $regex: city, $options: 'i' } },
          { title: { $regex: city, $options: 'i' } }
        ]
      });
      if (alllisting.length === 0) {
        req.flash("error", `No listings found for "${city}"`);
      }
      res.render('listings/index', { alllisting });
    } catch (error) {
      console.error(error);
      req.flash("error", "An error occurred while searching");
      res.redirect('/listings');
    }
};

//filter by category
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
    res.redirect('/listings');
  }
};
