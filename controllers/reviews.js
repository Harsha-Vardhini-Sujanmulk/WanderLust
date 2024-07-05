const Review = require("../models/review.js"); // Import the Review model for interacting with review data
const Listing = require("../models/listing.js"); // Import the Listing model for interacting with listing data

// **Exported functions (controllers) for review routes:**

// Create Review Route (POST /listings/:id/reviews) - Add a new review to a specific listing
module.exports.createReview = async (req, res) => {
	try {
		const { id } = req.params; // Extract listing ID from request parameters

		// Find the listing by ID
		let listing = await Listing.findById(id);

		// Create a new Review instance with review data from the request body
		let newReview = new Review(req.body.review);

		// Set the author ID of the review to the currently logged-in user
		newReview.author = req.user._id;

		// Flash a success message for the user
		req.flash("success", "Review Added!");

		// Push the new review to the listing's reviews array
		listing.reviews.push(newReview);

		// Save the new review and update the listing with the new review
		await newReview.save();
		await listing.save();

		// Redirect the user back to the listing detail page
		res.redirect(`/listings/${listing._id}`);
	} catch (err) {
		// Handle any errors during review creation
		console.error(err);
		// (Optional) You can redirect to an error page or display an error message
	}
};

// Destroy Review Route (DELETE /listings/:id/reviews/:reviewId) - Delete a specific review from a listing
module.exports.destroyReview = async (req, res) => {
	try {
		const { id, reviewId } = req.params; // Extract listing ID and review ID from request parameters

		// Use `findByIdAndUpdate` on the Listing model to remove the review by ID from the reviews array
		// $pull operator removes the specified review ID from the listing's reviews array
		await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

		// Find the review by ID and delete it
		await Review.findByIdAndDelete(reviewId);

		// Flash a success message for the user
		req.flash("success", "Review Deleted!");

		// Redirect the user back to the listing detail page
		res.redirect(`/listings/${id}`);
	} catch (err) {
		// Handle any errors during review deletion
		console.error(err);
		// (Optional) You can redirect to an error page or display an error message
	}
};
