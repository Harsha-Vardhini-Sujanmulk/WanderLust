// Require the Cloudinary library with version 2 (v2)
const cloudinary = require("cloudinary").v2;

// Require the CloudinaryStorage class from the multer-storage-cloudinary package
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configure Cloudinary with environment variables for security
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME, // Cloud name from your Cloudinary account
	api_key: process.env.CLOUD_API_KEY, // API Key from your Cloudinary account
	api_secret: process.env.CLOUD_API_SECRET, // API Secret from your Cloudinary account
});

// Create a Cloudinary storage instance using the configured Cloudinary object
const storage = new CloudinaryStorage({
	cloudinary: cloudinary, // Use the configured Cloudinary instance
	params: {
		folder: "wanderlust_DEV", // Set the upload folder name (likely for development)
		allowedFormats: ["png", "jpg", "jpeg"], // Specify allowed image formats for upload
	},
});

// Export both cloudinary instance and storage object for use in other parts of the application
module.exports = { cloudinary, storage };
