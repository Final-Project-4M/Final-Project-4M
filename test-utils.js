const mongoose = require('mongoose');

// Modify this line!!! Match it with our models
// const models = [require('./models/note'), require('./models/user')];
const models = [require('./models/post'), require('./models/thread'), require('./models/token'), require('./models/user')];

module.exports = {};

module.exports.connectDB = async () => {
  await mongoose.connect(global.__MONGO_URI__, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  });
  await Promise.all(models.map(m => m.syncIndexes()));
}

module.exports.stopDB = async () => {
  await mongoose.disconnect();
}

module.exports.clearDB = async () => {
  await Promise.all(models.map(model => model.deleteMany()))
}
