const server = require("./server");
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;

// Modify the first line of the next chunk of code to match our db/repo name

// mongoose.connect('mongodb://localhost/jscript-330-week-4', {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true
// }).then(() => {
//   server.listen(port, () => {
//    console.log(`Server is listening on http://localhost:${port}`);
//   });
// });