/* declare/define express by calling using require() or import on common js and type module, respectively */
const express = require('express');
// call express to create instance
const app = express();
console.log(app);
const PORT = 5000;

// 











app.listen(PORT, () => {
  console.log(`Server is listening to http://localhost:${PORT}`)
})