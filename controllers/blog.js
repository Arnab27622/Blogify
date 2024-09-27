const Blog = require('../models/blog.js');
const Comment = require('../models/comment.js');

function addBlogPage(req, res) {
    res.render('addBlog', {
        user: req.user
    });
};

async function createNewBlog(req, res) {
    const { title, body } = req.body;

    const coverImagePath = `/uploads/${req.user._id}/${req.file.filename}`;

    const blog = await Blog.create({
        title,
        body,
        coverImageURL: coverImagePath,
        author: req.user._id
    });

    res.redirect(`/blog/${blog._id}`);
};

async function getBlogPageById(req, res) {
    const blog = await Blog.findById(req.params.id).populate('author');
    const comments = await Comment.find({ blogId: req.params.id }).populate('author');
    if (!blog) {
        return res.status(404).json({ success: false, msg: 'Blog not found' });
    };
    res.render('blog', {
        blog,
        user: req.user,
        comments
    });
};

async function addCommentToBlog(req, res) {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, msg: 'You must be logged in to comment.' });
        }

        if (!req.body.content) {
            return res.status(400).json({ success: false, msg: 'Comment cannot be empty' });
        }

        await Comment.create({
            content: req.body.content,
            blogId: req.params.blogId,
            author: req.user._id
        });

        return res.redirect(`/blog/${req.params.blogId}`);
    } catch (error) {
        return res.status(500).json({ success: false, msg: 'Server error', error });
    }
}

module.exports = { addBlogPage, createNewBlog, getBlogPageById, addCommentToBlog }