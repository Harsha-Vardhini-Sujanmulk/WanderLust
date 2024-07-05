// Custom error class for handling errors in Express applications
class ExpressError extends Error {
	constructor(statusCode, message) {
		// Call the super class (Error) constructor to inherit its properties and methods
		super();

		// Define custom properties for the error object
		this.statusCode = statusCode; // HTTP status code for the error
		this.message = message; // Error message to be displayed to the user
	}
}

// Export the ExpressError class to be used in other modules
module.exports = ExpressError;


