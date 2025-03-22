const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

const collegeRouter = require('./routes/collegeRoute')
app.use('/api/colleges', collegeRouter)

// connect to mongodb using mongoose
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log(`Successfully connected to database!`)
    app.listen(PORT, () => {
      console.log(`Server listening to port ${PORT}`)
    })

  })
  .catch(error => {
    console.error(error.message)
  })