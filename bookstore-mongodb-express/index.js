// initialize express and mongoose
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

const bookRouter = require('./routes/bookRoute')
app.use('/books', bookRouter)



mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(`App connected to database`)
    app.listen(PORT, () => {
      console.log(`Server is listening to port ${PORT}`)
    })
  })
  .catch(error => {
    console.error('Unexpected error encountered ', error)
  })

