const express = require('express');
const router = express.Router();

// import our controller for new book creation
const createInitialDatasetController = require('../controllers/methods/postInitialDataset');

// mount controller (middleware)
router.post('/', createInitialDatasetController.create)

module.exports = router