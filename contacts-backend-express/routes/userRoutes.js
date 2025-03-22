const express = require('express');
const router = express.Router();

router.route('/').get(function (request, response) {
  response.json({ message: 'You are in users.' })
})


module.exports = router