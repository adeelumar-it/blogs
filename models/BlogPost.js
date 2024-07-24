// models/BlogPost.js

const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
  userid: {
    type: String,
  },
  blogtitle: {
    type: String,
    required: true,
  },
  blogdescription: {
    type: String,
    required: true,
  },
  blgIMG_64: {
    type: String,
    required: true,
  },
  publishdate: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPost; // Export the BlogPost model using CommonJS module.exports
