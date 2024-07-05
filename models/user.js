// Import Mongoose for defining the schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Import passport-local-mongoose for user authentication with username and password
const passportLocalMongoose = require("passport-local-mongoose");

// Define the User schema
const userSchema = new Schema({
	email: {
		type: String,
		required: true,
	},
});

// Apply passport-local-mongoose plugin to the schema
userSchema.plugin(passportLocalMongoose);

// Create the User model based on the schema
module.exports = mongoose.model("User", userSchema);
