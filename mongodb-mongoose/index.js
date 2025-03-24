const express = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express(); // instantiate an app

app.use(express.json()); // middleware for json request bodies

const allFindMethodRouter = require('./routes/allFindMethodsRoutes'); // import the allFindMethodRouter from routes
const createInitialDatasetRouter = require('./routes/createInitialDataset') // import createInitialDataset from routes

app.use('/books', allFindMethodRouter) // mount middleware
app.use('/books', createInitialDatasetRouter) // mount middleware for creating initial dataset

const PORT = process.env.PORT; // desired port
const MONGO_URI = process.env.MONGO_URI; // connection string

const mongooseConnection = mongoose.connection;
mongooseConnection.on('error', console.error.bind(console, 'connection error:'))
mongooseConnection.once('open', () => {

  const dbName = mongooseConnection.db.databaseName
  console.log(`You are accessing MongoDB: ${dbName}`)

})

// connect to mongodb using connection string
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to Database ')

    app.listen(PORT, () => {
      console.log(`Server is listening to port ${PORT}`)
    })
  })
  .catch(error => {
    console.error(error.message)
  })












