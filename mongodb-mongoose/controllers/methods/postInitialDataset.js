const Book = require('../../models/book.model')

// lets create initial books dataset in our database to use find() methods with actual documents in the collection
exports.create = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    const { title, author, publishYear } = newBook
    console.log(title, author, publishYear)

    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).json({
        message: 'Please provide details of book title, author, and publishYear',
        sample: {
          title: 'book title',
          author: 'book author',
          publishYear: 2025
        }
      })
    }

    res.status(201).json({
      message: 'Create new book successful!',
      content: {
        "title": title,
        "author": author,
        "publishYear": publishYear
      },
    })
    console.log(newBook)
    console.log(`New book created`)

  } catch (error) {
    console.error(error.message)
    res.status(500).json({ message: 'Server error' })
  }

}