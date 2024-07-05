const express = require("express"); // Import express for building the router

const router = express.Router(); // Create a new Express router

// Middleware Imports
const wrapAsync = require("../utils/wrapAsync.js"); // Error handling middleware
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js"); // Authentication and validation middleware
const listingController = require("../controllers/listings.js"); // Listing controller functions

// Multer and Cloud Storage configuration
const multer = require("multer"); // Middleware for handling multipart/form-data (file uploads)
const { storage } = require("../cloudConfig.js"); // Cloud storage configuration for uploads
const upload = multer({ storage }); // Configure multer with cloud storage

// Index Route (GET /listings)
router
	.route("/")
	.get(wrapAsync(listingController.index)) // Get all listings using the index controller function with error handling
	// Create route (POST /listings)
	.post(
		isLoggedIn, // Ensure user is logged in
		upload.single("listing[image]"), // Upload single image using 'listing[image]' field name
		validateListing, // Validate listing data
		wrapAsync(listingController.createListing) // Create a new listing using the createListing controller function with error handling
	);

// New Route (GET /listings/new)
router.get("/new", isLoggedIn, listingController.renderNewForm); // Render the new listing form, only accessible to logged in users

// Show, Update, Delete, and Edit Routes for individual listings (all use /listings/:id syntax)
router
	.route("/:id")
	// Show Route (GET /listings/:id)
	.get(wrapAsync(listingController.showListing)) // Get a specific listing using the showListing controller function with error handling
	.put(
		// Update Route (PUT /listings/:id)
		isLoggedIn, // Ensure user is logged in
		isOwner, // Ensure user owns the listing
		upload.single("listing[image]"), // Upload single image using 'listing[image]' field name (optional on update)
		validateListing, // Validate listing data
		wrapAsync(listingController.updateListing) // Update a specific listing using the updateListing controller function with error handling
	)
	.delete(
		// Delete Route (DELETE /listings/:id)
		isLoggedIn, // Ensure user is logged in
		isOwner, // Ensure user owns the listing
		wrapAsync(listingController.destroyListing) // Delete a specific listing using the destroyListing controller function with error handling
	);

// Edit Route (GET /listings/:id/edit)
router.get(
	"/:id/edit",
	isLoggedIn,
	isOwner,
	wrapAsync(listingController.renderEditForm)
); // Render the edit form for a specific listing, only accessible to logged in users who own the listing

module.exports = router; // Export the router for use in the main application
