const express = require('express');
const router = express.Router();

const samplesController = require('../controllers/sampleController')

router.get('/', samplesController.getSample)
router.get('/:id', samplesController.getSampleById)
router.post('/', samplesController.addSample)
router.delete('/:id', samplesController.deleteSample)

module.exports = router