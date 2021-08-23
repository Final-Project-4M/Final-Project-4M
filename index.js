const server = require("./server");
const mongoose = require('mongoose');
// require('dotenv').config();

// const uri = process.env.MONGO_URI;

const port = process.env.PORT || 5000;

mongoose.connect("mongodb+srv://4M_admin:4M_deploy@final-project-4m.zri4d.mongodb.net/Final-Project-4M?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => {
  server.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
  });
});
