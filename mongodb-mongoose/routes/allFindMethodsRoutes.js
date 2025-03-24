const express = require('express');
const router = express.Router();

// import our controller
const allFindMethodsController = require('../controllers/methods/allFindMethods')

// mount controller (middleware)
router.get('/all', allFindMethodsController.getAll); // find() no argument, find all documents in the collection
router.get('/', allFindMethodsController.getWithFilter); // fifnd() with filter query
router.get('/:id', allFindMethodsController.getBook); // findById(id) find one document in the collection using id
module.exports = router