const express = require("express");
const router = express.Router({mergeParams:true});//if our routers has same params which is user in parent we do this here we haeve listings.id 
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview,isLoggedIn,isReviewAuthor} = require("../middleware.js")
const reviewController = require("../controllers/reviews.js")


//post route review
router.post("/" , isLoggedIn , validateReview , wrapAsync(reviewController.createReview));
  
//delete revieww
router.delete("/:reviewId", isLoggedIn , isReviewAuthor , wrapAsync(reviewController.destroyReview));


module.exports =router;