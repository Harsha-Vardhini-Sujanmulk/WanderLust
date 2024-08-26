# [WanderLust](https://wanderlust-vaa1.onrender.com/listings) (Airbnb Clone)

Welcome to the WanderLust (Airbnb Clone) project! This repository contains a full-featured web application that replicates many of the core functionalities of Airbnb. Users can create accounts, list properties, and rent properties from other users. This project demonstrates the use of several modern web technologies and follows the MVC (Model-View-Controller) design pattern.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication:** Users can create accounts and log in to manage their properties.
- **Property Listings:** Users can create, edit, and delete their own property listings.
- **Reviews:** Users can leave reviews on properties they have visited.
- **Image Uploads:** Property images are uploaded and stored in Cloudinary.
- **Responsive Design:** The application is styled with Bootstrap for a responsive and user-friendly interface.

## Technologies Used

- **Backend:**
  - [Express.js](https://expressjs.com/)
  - [MongoDB](https://www.mongodb.com/) with [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
  - [Passport](http://www.passportjs.org/) for authentication
  - [Joi](https://joi.dev/) for schema validation
  - [Multer](https://github.com/expressjs/multer) for file uploads
  - [cookie-parser](https://github.com/expressjs/cookie-parser)
  - [method-override](https://github.com/expressjs/method-override)
  - [dotenv](https://github.com/motdotla/dotenv) for environment variables

- **Frontend:**
  - [EJS](https://ejs.co/) for templating
  - [Bootstrap](https://getbootstrap.com/) for styling

- **Cloud Services:**
  - [Cloudinary](https://cloudinary.com/) for image storage
  - [Render](https://render.com/) for deployment

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Harsha-Vardhini-Sujanmulk/WanderLust.git
   cd WanderLust
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add your configuration variables:
   ```sh
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   MONGODB_URI=your_mongodb_uri
   SESSION_SECRET=your_session_secret
   ```

4. **Run the application:**
   ```sh
   nodemon app.js
   ```

5. **Visit the application:**
   Open your browser and go to `http://localhost:8080`

## Usage

- **Sign Up:** Create a new account to start using the platform.
- **List a Property:** Once logged in, you can list your properties for others to view and rent.
- **Edit/Delete Listings:** Only the owner of a property can edit or delete their listing.
- **Leave Reviews:** Users can leave reviews on properties they have visited.

## Project Structure

```
.
├── config/
│   └── database.js      # Database configuration
├── controllers/         # Controllers for handling requests
├── models/              # Mongoose models
├── public/              # Publicly accessible assets
│   ├── css/
│   └── js/
├── routes/              # Application routes
├── views/               # EJS templates
├── .env                 # Environment variables
├── app.js               # Main application file
└── package.json         # NPM dependencies and scripts
```

## Contributing

Contributions are welcome! Please fork the repository and use a feature branch. Pull requests are warmly welcome.

1. **Fork the repository**
2. **Create a new branch:**
   ```sh
   git checkout -b feature-branch-name
   ```
3. **Make your changes**
4. **Commit your changes:**
   ```sh
   git commit -m 'Add some feature'
   ```
5. **Push to the branch:**
   ```sh
   git push origin feature-branch-name
   ```


(PS: the site may or may not work a bit slow as all the free services are being used for this)

Thank you for visiting the WanderLust project! Happy coding!
