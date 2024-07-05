// Import required modules
const mongoose = require("mongoose");
const initData = require("./data.js"); // Assumed to contain initial listing data
const Listing = require("../models/listing.js"); // Import the Listing model

// Main asynchronous function for connecting and initializing the database
async function main() {
	try {
		// Connect to the MongoDB database (replace "127.0.0.1" with your actual hostname if needed)
		await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
		console.log("connected to DB");

		// Call the initDB function to initialize the database with sample data
		await initDB();
	} catch (err) {
		console.error(err); // Log any errors during connection or initialization
	}
}

// Function to initialize the database with sample data
async function initDB() {
	// Delete all existing listings before initialization (optional, for clean start)
	await Listing.deleteMany({});

	// Map over the initial data and add a common owner ID to each listing
	// initData.data = initData.data.map((obj) => ({
	// 	...obj, // Spread operator to copy existing properties from each object
	// 	owner: "65c4ea1bce86d5a6c7047c80", // Set a common owner ID for all listings (replace if needed)
	// }));

	// Insert the modified initial data into the Listing collection
	await Listing.insertMany(initData.data);
	console.log("data was initialized");
}

// Call the main function to start the process
initDB();
