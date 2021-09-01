const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema({
    posts: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'posts' }], required: true },
    title: { type: String, required: true },
    userId: { type: String, required: true, index: true }
});

// dateCreated: { type: Date, required: true }

module.exports = mongoose.model("thread", threadSchema);
