const User = require("../models/user.js"); // Import the User model for interacting with user data

// **Exported functions (controllers) for user routes:**

// Render Signup Form Route (GET /users/signup) - Display the user signup form
module.exports.renderSignupForm = (req, res) => {
	// Render the users/signup.ejs view for user registration
	res.render("users/signup.ejs");
};

// Signup Route (POST /users/signup) - Process user signup form submission
module.exports.signup = async (req, res) => {
	try {
		// Extract username, email, and password from request body
		const { username, email, password } = req.body;

		// Create a new User instance with email and username
		const newUser = new User({ email, username });

		// Use Passport.js register function to create a new user with hashed password
		const registeredUser = await User.register(newUser, password);

		// Authenticate the user using Passport.js login function
		req.login(registeredUser, (err) => {
			if (err) {
				// Handle any errors during login (e.g., already authenticated)
				return next(err);
			}

			// Flash a success message to the user
			req.flash("success", "Welcome to WanderLust!");

			// Redirect the user to the listings page
			res.redirect("/listings");
		});
	} catch (err) {
		// Handle any errors during user creation (e.g., email already exists)
		req.flash("error", err.message); // Flash the error message
		res.redirect("/listings"); // Redirect back to listings page (optional, you can display the error on the signup form)
	}
};

// Render Login Form Route (GET /users/login) - Display the user login form
module.exports.renderLoginForm = (req, res) => {
	// Render the users/login.ejs view for user login
	res.render("users/login.ejs");
};

// Login Route (POST /users/login) - Process user login form submission
module.exports.login = async (req, res) => {
	// Flash a success message to the user after successful login
	req.flash("success", "Welcome back to WanderLust!");

	// Determine the redirect URL (from previous page or default to listings)
	const redirectUrl = res.locals.redirectUrl || "/listings";

	// Redirect the user to the intended location after login
	res.redirect(redirectUrl);
};

// Logout Route (GET /users/logout) - Logout the current user
module.exports.logout = (req, res, next) => {
	// Use Passport.js logout function to deauthenticate the user
	req.logout((err) => {
		if (err) {
			// Handle any errors during logout
			return next(err);
		}

		// Flash a success message to the user
		req.flash("success", "you are logged out!");

		// Redirect the user to the listings page
		res.redirect("/listings");
	});
};
