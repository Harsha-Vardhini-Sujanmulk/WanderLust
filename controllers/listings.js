const Listing = require("../models/listing.js"); // Import the Listing model for interacting with listings data

// **Exported functions (controllers) for listing routes:**

// Index Route (GET /listings) - Display all listings
module.exports.index = async (req, res) => {
  try {
    // Find all listings from the Listing model
    const allListings = await Listing.find({});
    // Render the listings/index.ejs view and pass all retrieved listings data
    res.render("listings/index.ejs", { allListings });
  } catch (err) {
    // Handle any errors during listing retrieval
    console.error(err);
    // (Optional) You can redirect to an error page or display an error message
  }
};

// New Route (GET /listings/new) - Render the new listing form
module.exports.renderNewForm = (req, res) => {
  // Render the listings/new.ejs view for creating a new listing
  res.render("listings/new.ejs");
};

// Show Route (GET /listings/:id) - Display a specific listing
module.exports.showListing = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the listing by ID and populate nested documents (reviews with author and owner)
    const listing = await Listing.findById(id)
      .populate({
        path: "reviews",
        populate: {
          path: "author",
        },
      })
      .populate("owner");

    // Check if listing exists, redirect with error flash message if not found
    if (!listing) {
      req.flash("error", "Listing doesn't exist!");
      res.redirect("/listings");
      return; // Exit the function if listing not found
    }

    // Render the listings/show.ejs view and pass the retrieved listing data
    res.render("listings/show.ejs", { listing });
  } catch (err) {
    // Handle any errors during listing retrieval
    console.error(err);
    // (Optional) You can redirect to an error page or display an error message
  }
};

// Create Route (POST /listings) - Process new listing form submission
module.exports.createListing = async (req, res, next) => {
  try {
    // Deconstructing listing data from request body (commented out as alternative approach is used)
    // let { title, description, image, price, location, country } = req.body;

    // Use Mapbox geocoding to get coordinates from the location text

    // Extract image details from uploaded file
    const url = req.file.path;
    const filename = req.file.filename;

    // Create a new Listing instance with form data and populate additional fields
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id; // Set the owner ID to the currently logged-in user
    newListing.image = { url, filename }; // Store image details
    newListing.geometry = response.body.features[0].geometry; // Set listing geometry from geocoding response

    // Save the new listing to the database
    const savedListing = await newListing.save();
    console.log(savedListing); // Log the saved listing for debugging (optional)

    // Flash a success message and redirect to listings index
    req.flash("success", "New Listing Added!");
    res.redirect("/listings");
  } catch (err) {
    // Handle any errors during listing creation
    console.error(err);
    // (Optional) You can redirect to an error page or display an error message
    next(err); // Pass the error to the next error handling middleware
  }
};

// Edit Route (GET /listings/:id/edit) - Render the edit form for a specific listing
module.exports.renderEditForm = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the listing by ID
    const listing = await Listing.findById(id);

    // Check if listing exists, redirect with error flash message if not found
    if (!listing) {
      req.flash("error", "Listing doesn't exist!");
      res.redirect("/listings");
      return; // Exit the function if listing not found
    }

    // Generate a URL for the existing image with a smaller width for display in the edit form
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");

    // Render the listings/edit.ejs view and pass the listing data and modified image URL
    res.render("listings/edit.ejs", { listing, originalImageUrl });
  } catch (err) {
    // Handle any errors during listing retrieval
    console.error(err);
    // (Optional) You can redirect to an error page or display an error message
  }
};

// Update Route (PUT /listings/:id) - Process listing edit form submission
module.exports.updateListing = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the listing by ID and update its properties using spread operator
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    // Check if a new image file was uploaded
    if (typeof req.file !== "undefined") {
      // Extract details from the uploaded file
      const url = req.file.path;
      const filename = req.file.filename;

      // Update the listing's image property with the new details
      listing.image = { url, filename };

      // Save the updated listing with the new image
      await listing.save();
    }

    // Flash a success message and redirect to the updated listing detail page
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
  } catch (err) {
    // Handle any errors during listing update
    console.error(err);
    // (Optional) You can redirect to an error page or display an error message
    next(err); // Pass the error to the next error handling middleware
  }
};

// Destroy Route (DELETE /listings/:id) - Delete a specific listing
module.exports.destroyListing = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the listing by ID and delete it
    const deletedListing = await Listing.findByIdAndDelete(id);

    // Flash a success message and redirect to listings index
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
  } catch (err) {
    // Handle any errors during listing deletion
    console.error(err);
    // (Optional) You can redirect to an error page or display an error message
    next(err); // Pass the error to the next error handling middleware
  }
};

