// This line checks if the application is not running in production environment
// (likely for development purposes). If not in production, it loads environment variables from a `.env` file using the `dotenv` package.
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express"); // Import express framework
const app = express(); // Create an Express application instance

// Import required dependencies
const mongoose = require("mongoose"); // for connecting to MongoDB database
const path = require("path"); // for handling file paths
const methodOverride = require("method-override"); // for overriding HTTP methods (e.g., PUT/DELETE with forms)
const ejsMate = require("ejs-mate"); // for extending ejs templating engine
const ExpressError = require("./utils/ExpressError.js"); // Custom error class for handling errors
const MongoStore = require("connect-mongo"); // for storing session data in MongoDB
const flash = require("connect-flash"); // for handling temporary messages (flash messages)
const passport = require("passport"); // for user authentication
const session = require("express-session"); // for managing user sessions
const LocalStrategy = require("passport-local"); // Local authentication strategy using username and password

// Import models (likely defines User schema)
const User = require("./models/user.js");

// Import routers for different functionalities of the application
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// Define the database URL from the environment variable
const dbUrl = process.env.ATLAS_DB_URL;
// const dbUrl = "mongodb://localhost:27017/wanderlust";

// Connect to the MongoDB database asynchronously
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

// Configure the session store using MongoDB
const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET, // Secret key for session encryption
  },
  touchAfter: 24 * 3600, // Update session data every 24 hours
});

store.on("error", function (err) {
  console.log("ERROR in MONGO SESSION STORE", err);
});

// Define session configuration options
const sessionOptions = {
  store,
  secret: process.env.SECRET, // Secret key for session management
  resave: false, // Don't resave session if not modified
  saveUninitialized: true, // Save new sessions even if not initialized
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // Set cookie expiry to 7 days
    maxAge: 7 * 24 * 60 * 60 * 1000, // Same as expires
    httpOnly: true, // Protect cookie from client-side scripting
  },
};

// Configure view engine settings
app.set("view engine", "ejs"); // Set EJS as the templating engine
app.set("views", path.join(__dirname, "views")); // Specify the directory for views

// Configure middleware for processing data
app.use(express.urlencoded({ extended: true })); // Parse incoming form data
app.use(methodOverride("_method")); // Allow overriding methods (PUT/DELETE)
app.engine("ejs", ejsMate); // Extend EJS with additional functionalities
app.use(express.static(path.join(__dirname, "/public"))); // Serve static files from the 'public' directory

// Configure session management
app.use(session(sessionOptions));

// Configure flash messages for temporary notifications
app.use(flash());

// Initialize and configure Passport for authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); // Use local strategy with User model's authenticate function
passport.serializeUser(User.serializeUser()); // Define how to serialize user data for session storage
passport.deserializeUser(User.deserializeUser()); // Define how to deserialize user data for session retrieval

// Middleware to make flash messages and current user information available to all views
app.use((req, res, next) => {
  res.locals.success = req.flash("success"); // Access success flash messages from session
  res.locals.error = req.flash("error"); // Access error flash messages from session
  res.locals.currUser = req.user; // Make currently logged-in user info available in templates
  next(); // Pass control to the next middleware or route handler
});

// Mount routers for different functionalities
app.use("/listings", listingRouter); // Use routes defined in listingRouter for '/listings' path and its subpaths
app.use("/listings/:id/reviews", reviewRouter); // Use routes defined in reviewRouter for '/listings/:id/reviews' path (likely for reviews specific to a listing)
app.use("/", userRouter); // Use routes defined in userRouter for '/' path (likely for user-related routes)

// Catch-all route for unmatched paths (404 Not Found)
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!..")); // Pass a custom error object for a 404 Not Found response
});

// Error handling middleware
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!.." } = err; // Destructure error object, set defaults for status and message
  res.status(statusCode).render("error.ejs", { message }); // Render an error template with the error message
});

// Start the server and listen on port 8080
app.listen(8080, () => {
  console.log("app is listening on port 8080");
});
