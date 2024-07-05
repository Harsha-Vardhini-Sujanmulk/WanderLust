// Function to create error-handling middleware
module.exports = (fn) => {
	// Returns a function that takes request, response, and next objects as arguments
	return (req, res, next) => {
		// Call the provided function (fn) with the request, response, and next objects
		fn(req, res, next)
			// If the function throws an error or rejects a promise (using async/await)
			.catch(next);
	};
};
