const { Schema, model } = require("mongoose");

// define a sample schema
const Books_Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

// create a model from the schema
const Book = model('Book', Books_Schema);

// export the model
module.exports = Book;