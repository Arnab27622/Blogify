const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { addBlogPage, createNewBlog, getBlogPageById, addCommentToBlog } = require('../controllers/blog.js');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const userFolder = path.join(__dirname, '../public/uploads', req.user._id.toString());

        if (!fs.existsSync(userFolder)) {
            fs.mkdirSync(userFolder, { recursive: true });
        }

        cb(null, userFolder);
    },
    filename: function (req, file, cb) {
        const filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

router.get('/add-new', addBlogPage);
router.post('/', upload.single('coverImage'), createNewBlog);
router.get('/:id', getBlogPageById);
router.post('/comment/:blogId', addCommentToBlog);

module.exports = router;