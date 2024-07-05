// Import required modules
const ExpressError = require("./utils/ExpressError.js"); // Custom error class for handling errors
const Listing = require("./models/listing.js"); // Model for listing data
const Review = require("./models/review.js"); // Model for review data
const { listingSchema, reviewSchema } = require("./schema.js"); // Validation schemas for listing and review data

// Middleware function to check if user is logged in
module.exports.isLoggedIn = (req, res, next) => {
	// You can uncomment this line for debugging purposes (logs requested path and original URL)
	// console.log(req.path, "..", req.originalUrl);

	// Check if user is authenticated using Passport
	if (!req.isAuthenticated()) {
		// Store the requested URL for redirection after login
		req.session.redirectUrl = req.originalUrl;
		// Flash an error message
		req.flash("error", "you must be logged in");
		// Redirect user to login page
		return res.redirect("/login");
	}
	// If user is authenticated, proceed to the next middleware or route handler
	next();
};

// Middleware function to save the redirect URL in locals for future use
module.exports.saveRedirectUrl = (req, res, next) => {
	// Check if redirect URL exists in session
	if (req.session.redirectUrl) {
		// Make the redirect URL available in the template as a local variable
		res.locals.redirectUrl = req.session.redirectUrl;
	}
	// Proceed to the next middleware or route handler
	next();
};

// Middleware function to check if the current user is the owner of a listing
module.exports.isOwner = async (req, res, next) => {
	// Extract listing ID from request parameters
	let { id } = req.params;
	// Find the listing by ID
	let listing = await Listing.findById(id);
	// Check if the current user's ID matches the owner's ID of the listing
	if (!listing.owner.equals(res.locals.currUser._id)) {
		// Flash an error message
		req.flash("error", "you are not the owner");
		// Redirect user to the listing details page
		return res.redirect(`/listings/${id}`);
	}
	// If user is the owner, proceed to the next middleware or route handler
	next();
};

// Middleware function to check if the current user is the author of a review
module.exports.isReviewAuthor = async (req, res, next) => {
	// Extract listing ID and review ID from request parameters
	let { id, reviewId } = req.params;
	// Find the review by ID
	let review = await Review.findById(reviewId);
	// Check if the current user's ID matches the author's ID of the review
	if (!review.author.equals(res.locals.currUser._id)) {
		// Flash an error message
		req.flash("error", "you are not the author of this review!");
		// Redirect user to the listing details page
		return res.redirect(`/listings/${id}`);
	}
	// If user is the author, proceed to the next middleware or route handler
	next();
};

// Middleware function to validate listing data against the defined schema
module.exports.validateListing = (req, res, next) => {
	// Use the listing schema to validate the request body (containing listing data)
	let { error } = listingSchema.validate(req.body);
	// Check if there are any validation errors
	if (error) {
		// Extract error messages from validation details and combine them into a string
		let errMsg = error.details.map((ele) => ele.message).join(",");
		// Throw a custom ExpressError with appropriate status code and error message
		throw new ExpressError(400, errMsg);
	}
	// If validation passes, proceed to the next middleware or route handler
	next();
};

// Middleware function to validate review data against the defined schema
module.exports.validateReview = (req, res, next) => {
	// Use the review schema to validate the request body (containing review data)
	let { error } = reviewSchema.validate(req.body);
	// Check if there are any validation errors
	if (error) {
		// Extract error messages from validation details and combine them into a string
		let errMsg = error.details.map((ele) => ele.message).join(",");
		// Throw a custom ExpressError with appropriate status code and error message
		throw new ExpressError(400, errMsg);
	}
	// If validation passes, proceed to the next middleware or route handler
	next();
};
