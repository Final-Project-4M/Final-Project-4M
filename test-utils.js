const mongoose = require('mongoose');
// require('dotenv').config();


const models = [require('./models/post'), require('./models/thread'), require('./models/token'), require('./models/user')];

module.exports = {};

module.exports.connectDB = async () => {
  await mongoose.connect("mongodb+srv://4M_admin:4M_deploy@final-project-4m.zri4d.mongodb.net/Final-Project-4M?retryWrites=true&w=majority", {
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
