/* declare/define express by calling using require() or import on common js and type module, respectively */
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

// call express to create instance
const app = express();
app.use(express.json());

const sampleRouter = require('./routes/sampleRoutes')
app.use('/books', sampleRouter);

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

/* Controllers are middleware functions that handles the logic for the routes. Instead of being created with in the router methods
  it is better to separate them and just pass them as callback functions/middleware. This is also in combination with the database queries handle during requests.
*/

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log(`Database connection successful`)

    // call listen method with logging middleware function to listen to a specific port provided where requests are made
    app.listen(PORT, () => {
      console.log(`Server is listening to http://localhost:${PORT}`)
    })
  })
  .catch(error => {
    console.error(error.message)
  })

