const mongoose = require('mongoose');
const User = require('../models/user');

module.exports = {};

module.exports.createUser = async (userObj) => {
    const created = await User.create(userObj);
    return created;
};

module.exports.getUser = async (email) => {
    return await User.findOne({ email: email });
};

module.exports.getAllUser = async () => {
    return await User.find().lean();
};

module.exports.updateUserPassword = async (userId, password) => {
    await User.updateOne({ _id: userId}, { $set: { password: password } });
    return true;
};