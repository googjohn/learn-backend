import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { User } from './models/user.model.js';
// import router from './routes/users.js'
// const express = require('express');
// const cors = require('cors');
// require('dotenv').config()

dotenv.config();
const app = express();

app.use(cors());

app.use(express.json())

const port = process.env.PORT || 3000
const uri = process.env.MONGO_DRIVERS_CONNECTION_STRING_URL

mongoose.connect(uri);

const mongoConnection = mongoose.connection;
mongoConnection.once('open', () => {
  console.log('Connected to MongoDB via (Mongoose)')
})

// const exercisesRouter = require('./routes/exercises.js');

// app.use('/exercises', exercisesRouter);


// const usersRouter = router
// app.use('/users', usersRouter);

const newUser = new User({
  username: 'Peete',
})


const findUser = await User.findOne({})
if (!findUser) {
  await newUser.save();
} else {

  app.get('/users', (req, res) => {
    res.send(`<p style="font-size: 3em;color: green; text-align: center">The server responds and collected user ${findUser.username}</p>`)
  })
}
console.log(findUser)





app.listen(port, () => {
  console.log(`listening at http://localhost:3000`)
})