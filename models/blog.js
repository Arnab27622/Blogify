const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    coverImageURL: {
        type: String
    }
}, {
    timestamps: true,
    versionKey: false,
    minimize: false,
    strict: false,
    autoIndex: true,
});

const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;