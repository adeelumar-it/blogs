const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user'); // Corrected model name
const BlogPost = require('../models/BlogPost');

// Get all blog posts
//router.get('/', async (req, res) => {
   // try {
    //    const data = await BlogPost.find();
    //    res.json(data);
  //  } catch (err) {
    //    res.status(500).json({ error: err.message });
    //}
//});

// Create a new blog post
router.post('/AddArticle', async (req, res) => {
    const { userid, blogtitle, blogdescription, blgIMG_64, publishdate } = req.body;

    const newPost = new BlogPost({
        userid,
        blogtitle,
        blogdescription,
        blgIMG_64,
        publishdate,
    });

    try {
        const newData = await newPost.save();
        res.status(201).json(newData);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Register a new user
debugger
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the user with the given email already exists
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);
debugger
        // Create a new user instance
        user = new User({
            name,
            email,
            password: hashedPassword,
        });

        // Save the user to the database
        await user.save();

        // Respond with success message
        debugger
        res.status(201).json({ success: true, data: user });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Server error' });
    }
});
// all blogs
router.get('/blogs', async (req, res) => {
    try {
        const data = await BlogPost.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        res.status(200).json({ success: true, data: { id: user._id, name: user.name, email: user.email } });

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get blog post by ID
router.get('/:id', getData, (req, res) => {
    res.json(res.data);
});

// Get blog posts by category
router.get('/category/:category', async (req, res) => {
    try {
        const data = await BlogPost.find({ category: req.params.category });

        if (data.length === 0) {
            return res.status(404).json({ message: 'No data found for this category' });
        }

        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Middleware function to get blog post by ID
async function getData(req, res, next) {
    let data;
    try {
        data = await BlogPost.findById(req.params.id);

        if (data == null) {
            return res.status(404).json({ message: 'Data not found' });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }

    res.data = data;
    next();
}

module.exports = router;
