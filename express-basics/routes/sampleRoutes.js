const express = require('express');
const router = express.Router();

const samplesController = require('../controllers/sampleController')

// route for general request
router.route('/')
  .get(samplesController.getSample)
  .post(samplesController.addSample)

// routes for specific requests with id
router.route('/:id')
  .get(samplesController.getSampleById)
  .put(samplesController.updateSample)
  .delete(samplesController.deleteSample)


module.exports = router