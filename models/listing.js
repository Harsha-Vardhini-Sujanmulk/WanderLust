// Import Mongoose for defining the schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Import the Review model (assuming it's in a separate file)
const Review = require("./review.js");

// Define the Listing schema
const listingSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: String,
	image: {
		url: String,
		filename: String,
	},
	price: Number,
	location: String,
	country: String,
	reviews: [
		{
			type: Schema.Types.ObjectId,
			ref: "Review", // Reference the Review model for nested documents
		},
	],
	owner: {
		type: Schema.Types.ObjectId,
		ref: "User", // Reference the User model for owner information
	},
});

// Post middleware hook for "findOneAndDelete"
listingSchema.post("findOneAndDelete", async (listing) => {
	if (listing) {
		// If a listing is deleted, delete all its associated reviews
		await Review.deleteMany({ _id: { $in: listing.reviews } });
	}
});

// Create the Listing model based on the schema
const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
