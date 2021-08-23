const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema({
    posts: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'posts' }], required: true },
    userId: { type: String, required: true, index: true }
    // dateCreated: { type: Date, required: true, default: Date.now() }
});

module.exports = mongoose.model("thread", threadSchema);
