require('dotenv').config();

const express = require('express');
const path = require('path');
const { connectMongoDB } = require('./connection.js');
const cookie_parser = require('cookie-parser');
const { checkForAuthentication } = require('./middleware/auth.js');
const app = express();
const port = process.env.PORT || 5000;

if (!process.env.MONGO_URL) {
    console.error('MONGO_URL is not defined in .env file');
    process.exit(1);
}

const userRoute = require('./routes/user.js');
const blogRoute = require('./routes/blog.js');

connectMongoDB(process.env.MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('MongoDB connection failed:', err.message);
        process.exit(1);
    });

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookie_parser());
app.use(checkForAuthentication);

app.use('/', userRoute);
app.use('/blog', blogRoute);

app.listen(port, () => {
    console.log(`Server is running on Port ${port}...`);
});