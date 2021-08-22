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

module.exports.getThreadById = async (threadId) => {
    const thread = await Thread.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(threadId) }},
        { $unwind: "$threads" },
        { $lookup: { from: "threads", localField: "threads", foreignField: "_id", as: "thread" }},
        { $unwind: '$thread'},
        { $project: { _id: 0} },
        { $group: { _id: "$_id", userId: { $first: "$userId" }, items: { $push: "$thread"}, total: {$first: "$total"}}}
    ]);
    return order[0];
};

module.exports.getThreadByUser = async (userId) => {
    return await Thread.find({ userId: userId });
}