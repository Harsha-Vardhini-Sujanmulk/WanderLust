// Import Mongoose for defining the schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Review schema
const reviewSchema = new Schema({
	comment: String, // Text content of the review
	rating: {
		type: Number, // Rating value (integer)
		min: 1, // Minimum allowed rating
		max: 5, // Maximum allowed rating
	},
	createdAt: {
		type: Date, // Date and time the review was created
		default: Date.now, // Set default value to the current time
	},
	author: {
		type: Schema.Types.ObjectId, // Reference to the User who wrote the review
		ref: "User", // Reference the User model for author information
	},
});

// Create the Review model based on the schema
module.exports = mongoose.model("Review", reviewSchema);
