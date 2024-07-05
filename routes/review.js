const express = require("express"); // Import express for building the router

const router = express.Router({ mergeParams: true }); // Create a new Express router with `mergeParams` enabled

// Middleware Imports
const wrapAsync = require("../utils/wrapAsync.js"); // Error handling middleware
const {
	validateReview,
	isLoggedIn,
	isReviewAuthor,
} = require("../middleware.js"); // Review validation and authorization middleware
const reviewController = require("../controllers/reviews.js"); // Review controller functions

// **Routes for Reviews (all assume a parent resource like a product or listing has already been identified by its ID in the URL):**

// Create a Review (POST /:resourceId/reviews)
router.post(
	"/", // Matches the root path under the parent resource (e.g., /products/:productId/reviews)
	validateReview, // Ensure valid review data
	isLoggedIn, // User must be logged in to create a review
	wrapAsync(reviewController.createReview) // Create a new review using the createReview controller function with error handling
);

// Delete a Review (DELETE /:resourceId/reviews/:reviewId)
router.delete(
	"/:reviewId", // Matches a specific review ID under the parent resource (e.g., /products/:productId/reviews/:reviewId)
	isLoggedIn, // User must be logged in to delete a review
	isReviewAuthor, // User must be the author of the review to delete it
	wrapAsync(reviewController.destroyReview) // Delete a specific review using the destroyReview controller function with error handling
);

module.exports = router; // Export the router for use in the main application
