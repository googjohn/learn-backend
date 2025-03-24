// import the model
const Book = require('../../models/book.model');

// find(filter, projections, options)
// ## filter >> a query object that specifies the conditions the documents must meet
// ## projections >> specifies which fields to include or exclude
// ## options >> additional query options like sorting and limiting
// ## no argument >> will return all documents in the collection. this is good for small collections but should be used sparingly/cautiosly with lasrge datasets

// get all books
exports.getAll = async (req, res) => {
  try {
    const findAll = await Book.find(); // no argument will return all documents in the collection

    if (!findAll.length) {
      return res.status(404).json(
        {
          message: 'Nothing found',
          contentLength: findAll.length,
          content: findAll
        }
      )
    }

    res.status(200).json(
      {
        message: 'Search successful!',
        contentLength: findAll.length,
        content: findAll
      }
    )
    console.log('Books found')
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' })
  }
}

// get a book with filter
exports.getWithFilter = async (req, res) => {
  try {
    const queryFilter = {}; // create an empty object that will store request queries as filter
    if (req.query.title) {
      queryFilter.title = req.query.title || {};
    }

    if (req.query.author) {
      queryFilter.author = req.query.author || {};
    }

    if (req.query.publishYear) {
      queryFilter.publishYear = +req.query.publishYear || {};
    }
    console.log(req.query.search)
    const book = await Book.find(queryFilter)

    if (!book.length) {
      return res.status(404).json({ message: 'Book not found' })
    }

    res.status(200).json({
      message: 'Book found',
      contentLength: book.length,
      content: book
    })
    console.log('Book found')
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ message: 'Server error' })
  }
}




















// get a book by id >> request params id
exports.getBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: 'No book found' })
    }

    res.status(200).json({
      message: 'Book found',
      content: book
    })
    console.log('Book found')
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ message: 'Server error' })
  }
}