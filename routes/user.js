const express = require("express"); // Import express for building the router

const router = express.Router(); // Create a new Express router

// Middleware Imports
const wrapAsync = require("../utils/wrapAsync.js"); // Error handling middleware
const passport = require("passport"); // Passport for user authentication
const { saveRedirectUrl } = require("../middleware.js"); // Middleware for saving redirect URL

const userController = require("../controllers/users.js"); // User controller functions

// User Signup Routes (GET /users/signup, POST /users/signup)
router
	.route("/signup")
	.get(userController.renderSignupForm) // Render the signup form
	.post(wrapAsync(userController.signup)); // Handle user signup using the signup controller function with error handling

// User Login Routes (GET /users/login, POST /users/login)
router
	.route("/login")
	.get(userController.renderLoginForm) // Render the login form
	.post(
		saveRedirectUrl, // Save the original request URL before login (optional)
		passport.authenticate("local", {
			// Use passport local strategy for authentication
			failureRedirect: "/login", // Redirect to login on failure
			failureFlash: true, // Set a flash message for login failure
		}),
		userController.login // Handle successful login using the login controller function
	);

// User Logout Route (GET /users/logout)
router.get("/logout", userController.logout); // Handle user logout using the logout controller function

module.exports = router; // Export the router for use in the main application
