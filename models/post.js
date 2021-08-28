const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: { type: String, required: true },
    userId: { type: String, required: true, index: true },
    threadId: { type: String, required: true }
});

// dateCreated: { type: Date, required: true }

module.exports = mongoose.model("post", postSchema);