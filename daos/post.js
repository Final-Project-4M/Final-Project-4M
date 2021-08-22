const mongoose = require('mongoose');
const Post = require('../models/post');

module.exports = {};

// Create a post: POST /post
module.exports.createPost = async (postObj) => {
    const created = await Post.create(postObj);
    return created;
};

// Update a post: PUT /post/:postId
module.exports.updatePost = async (postId, postObj) => {
    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return false;
    }
    //update a post using their postId and the postObj
    await Post.updateOne({ _id: postId }, postObj);
    return true;
};

// Get all posts: GET /posts - open to all users
module.exports.getPosts = async () => {
    //find all items
    return await Post.find().lean();
};

// Get one post: GET /posts/:postId
module.exports.getOnePost = async (postId) => {
    //find one post
    return await Post.findOne({ _id: postId });
};