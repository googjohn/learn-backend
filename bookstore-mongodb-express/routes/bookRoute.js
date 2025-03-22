const express = require('express');
const Book = require('../models/book.model');
const router = express.Router();

const logger = (req, res, next) => {
  console.log(`${req.method} request for book store received`)
  next();
}

router.use(logger)

router.route('/')
  .get(async (req, res) => {
    try {
      // method to find all content/collection in the database (mongodb)
      const books = await Book.find({});

      if (!books.length) {
        return res.status(404).send({
          message: "No books found"
        })
      }

      console.log(`${req.method} request for book list processed.`)

      return res.status(200).send({
        count: books.length,
        data: books
      })

    } catch (error) {

      console.error(error)
      res.status(500).send({ message: error.message })

    }
  })
  .post(async (req, res) => {
    try {

      if (!req.body.title || !req.body.author || !req.body.publishYear) {
        return res.status(400).send({
          message: 'Send all required fields: title, author, publishYear'
        });
      }

      const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear
      }

      // method to create/add new item in the database (mongodb)
      const book = await Book.create(newBook)

      console.log(`${req.method} request successful`)

      return res.status(201).send({
        message: 'Book created',
        content: book
      })

    } catch (error) {

      console.error(error)
      res.status(500).send({ message: error.message })

    }
  })
  .put((req, res) => {
    console.log(`${req.method} request received`)
    res.status(200).send('Book updated from store')
  })
  .delete(async (req, res) => {
    try {
      // asking user/client if they are sure to delete probably will be handled on the client side thru javascript/HTML
      const books =
        console.log(`${req.method} request successful`)
      res.status(200).send('Book deleted from store')
    } catch (error) {
      console.log(error)
      res.status(500).send({ message: error.message })
    }
  })

router.route('/:id')
  .get(async (req, res) => {
    try {
      const { id: bookId } = req.params;
      const book = await Book.findById(bookId)

      if (!book) {
        return res.status(404).send({
          message: 'No book found'
        })
      }

      console.log(`${req.method} request successful`)
      return res.status(200).send({
        message: 'Found your book',
        data: book
      })

    } catch (error) {
      console.error(error)
      res.status(500).send({ message: error.message })
    }
  })
  .delete(async (req, res) => {
    try {
      const { id: bookId } = req.params;
      const bookToDelete = await Book.findByIdAndDelete(bookId)

      if (!bookToDelete) {
        return res.status(404).send({
          message: 'No book found'
        })
      }

      return res.status(200).send({
        message: 'Book deleted successfully',
      })

    } catch (error) {
      console.error(error)
      res.status(500).send({ message: error.message })
    }
  })
module.exports = router;