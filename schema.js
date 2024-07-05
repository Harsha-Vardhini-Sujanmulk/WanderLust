const Joi = require("joi"); // Import Joi for validation

// Define the schema for listing data
module.exports.listingSchema = Joi.object({
	listing: Joi.object({
		// Defines a nested object named 'listing'
		title: Joi.string().required(), // Title is a required string
		description: Joi.string().required(), // Description is a required string
		location: Joi.string().required(), // Location is a required string
		country: Joi.string().required(), // Country is a required string
		price: Joi.number().required().min(0), // Price must be a number, required, and minimum 0
		image: Joi.string().allow("", null), // Image can be a string, empty string, or null (optional)
	}).required(), // The entire 'listing' object is required within the schema
});

// Define the schema for review data
module.exports.reviewSchema = Joi.object({
	review: Joi.object({
		// Defines a nested object named 'review'
		rating: Joi.number().required().min(1).max(5), // Rating must be a number, required, between 1 and 5
		comment: Joi.string().required(), // Comment is a required string
	}).required(), // The entire 'review' object is required within the schema
});
