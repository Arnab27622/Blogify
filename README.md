# Blogify

## Author
  Arnab Dey
#
A full-featured blogging application built with Node.js, where users can create blogs, upload photos, comment on blogs, and manage their accounts. Authentication is handled via JWT tokens, and MongoDB is used to store all the data.

## Features

- **Blog Creation**: Users can create a blog and upload photos to be associated with their posts.
- **User Authentication**: Users can create accounts, sign in, and sign out. JWT tokens are used for secure authentication.
- **Commenting System**: Users can add comments to blogs when signed in. Non-authenticated users can view blogs and comments but cannot comment.
- **Authorization**: Authenticated routes are protected and can only be accessed by users who are logged in. JWT tokens ensure secure access.
- **MongoDB Integration**: MongoDB is used as the database to store user data, blog posts, and comments.
  
## Technologies Used

- **Node.js**: Backend framework.
- **Express.js**: For handling server-side logic and routing.
- **MongoDB**: Database for storing blog data and user information.
- **Mongoose**: ODM for MongoDB, used to simplify interactions with the database.
- **JWT (JSON Web Tokens)**: For authentication and protecting routes.
- **Multer**: Middleware for handling file uploads (used for uploading blog images).
- **bcrypt.js**: For password hashing.
- **EJS**: For rendering dynamic HTML on the server side.

## Prerequisites

Make sure you have the following installed on your machine:

- **Node.js**
- **MongoDB**

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Arnab27622/Blogify.git
2. Install dependencies:
   ```bash
   npm install
3. Create a .env file in the root directory and configure the following environment variables:
   ```
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_secret_key_for_jwt
   PORT=5000
4. Start the application:
   ```bash
   npm start
5. Project Structure
   ```
   ├── models
   │   ├── user.js          # User schema and model
   │   ├── blog.js          # Blog schema and model
   │   └── comment.js       # Comment schema and model
   ├── routes
   │   ├── blog.js          # Blog-related routes
   │   └── user.js          # User-related routes
   ├── controllers
   │   ├── blog.js          # Logic for blog handling
   │   └── user.js          # Logic for user handling
   ├── middleware
   │   └── auth.js          # Logic for Authorization Checking
   ├── public
   │   └── uploads          # Folder for storing uploaded blog images
   ├── service
   │   ├── auth.js          # Logic for JWT token creation and verification
   ├── views                # EJS views for rendering HTML
   │   └── partials         
   ├── app.js               # Main entry point for the application
   ├── connection.js        # Handles MongoDB connection
   └── package.json         # Dependency management

## Future Enhancements
  Pagination: Adding pagination to blog listing for better performance with large datasets.<br>
  User Profiles: Enabling users to edit their profiles and view other user profiles.<br>
  Likes System: Implementing a "like" feature for blog posts.
