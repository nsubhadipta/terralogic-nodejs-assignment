const Book = require('../models/bookModel');

// List all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      status: true,
      data:books,
      message: "Data Fetched statusfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Failed to fetch books",
      error: error.message,
    });
  }
};

// Get book by ID
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({
        status: false,
        message: 'Book not found',
      });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Failed to fetch book',
      error: error.message,
    });
  }
};

// Create a new book
exports.createBook = async (req, res) => {
  try {    
    const { title, author, year } = req.body;
    const newBook = new Book({ title, author, year });
    const savedBook = await newBook.save();
    res.status(201).json({
      status: true,
      data:savedBook,
      message: 'Book cretaed Successfully',
    });
   
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Failed to add book',
      error: error.message,
    });
  }
};

// Update a book by ID
exports.updateBookById = async (req, res) => {
  try {
    const { title, author, year } = req.body;
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, year },
      { new: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json({
      status: true,
      updatedBook,
      message: 'Book Updated Successfully',
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Failed to update book',
      error: error.message,
    });
  }
};

// Delete a book by ID
exports.deleteBookById = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({
        status: false,
        message: 'Book not found',
      });
    }

    res.json({
      status: true,
      message:'Book deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message:'Failed to delete book',
      error: error.message,
    });
  }
};