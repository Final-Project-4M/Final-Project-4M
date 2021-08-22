const server = require("./server");
const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI;

const port = process.env.PORT || 5000;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => {
  server.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
  });
});
