const mongoose = require('mongoose');
const Thread = require('../models/thread');

module.exports = {};

module.exports.createThread = async (threadObj) => {
    const created = await Thread.create(threadObj);
    return created;
};

module.exports.getThreads = async () => {
    return await Thread.find().lean();
};

module.exports.addPostToThread = async (postId, threadId) => {
    const thisThread = await Thread.findOne({ _id: threadId });
    let postArr = thisThread.posts;
    postArr.push(postId);
    await Thread.updateOne({ _id: threadId }, { $set: { posts: postArr } });
    return true;
};

// Update post inside the posts array in thread
// Don't need to visit thread's posts array!
// module.exports.updatePostInsideThread = async () => {
// };

// Delete post inside the posts array in thread
// Delete the post in database also in thread's posts array!
// module.exports.deletePostInsideThread = async () => {
// };

module.exports.getThreadById = async (threadId) => {
    const thisThread = await Thread.findOne({ _id: threadId });
    return thisThread;
};

module.exports.getThreadByUser = async (userId) => {
    return await Thread.find({ userId: userId });
}
