const mongoose = require('mongoose');
const Post = require('../modles/post');

module.exports = {};

module.exports.createPost = async (postObj) => {
    const created = await Post.create(postObj);
    return created;
};

module.exports.updateItem = async (postId, )
