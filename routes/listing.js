const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// Index Route
router
	.route("/")
	.get(wrapAsync(listingController.index)) // Index
	// Create route
	.post(
		isLoggedIn,
		upload.single("listing[image]"),
		validateListing,
		wrapAsync(listingController.createListing)
	);

// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
	.route("/:id")
	// Show Route
	.get(wrapAsync(listingController.showListing))
	.put(
		// Update Route
		isLoggedIn,
		isOwner,
		upload.single("listing[image]"),
		validateListing,
		wrapAsync(listingController.updateListing)
	)
	.delete(
		// Delete Route
		isLoggedIn,
		isOwner,
		wrapAsync(listingController.destroyListing)
	);

// Edit Route
router.get(
	"/:id/edit",
	isLoggedIn,
	isOwner,
	wrapAsync(listingController.renderEditForm)
);

module.exports = router;
