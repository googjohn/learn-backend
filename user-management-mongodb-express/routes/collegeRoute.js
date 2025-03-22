// initialize express and router
const express = require('express');
const router = express.Router();

// logs method and time upon request receipt
const logger = (request, response, next) => {
  console.log(`Received ${request.method} request at ${new Date().toUTCString()}`);
  next();
}

router.use(logger)

router.route('/')
  .get((request, response) => {
    try {
      return response.status(200).send({
        message: 'Request processed. You are viewing colleges',
      })
    } catch (error) {
      console.error(error.message)
      response.status(500).send('Internal error encountered')
    }
  })

module.exports = router