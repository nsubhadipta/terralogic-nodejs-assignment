const {bookSchema} = require("../utils/RequestValidators/book.scheme");
const validateMiddleware = require("../middleware/validationMiddleware");

module.exports = (router) => {
  const bookController = require("../controllers/bookController");

    // Books API
    router.post('/books', validateMiddleware(bookSchema), bookController.createBook);
    router.get('/books', bookController.getAllBooks);
    router.get('/books/:id', bookController.getBookById);
    router.put('/books/:id', validateMiddleware(bookSchema), bookController.updateBookById);
    router.delete('/books/:id', bookController.deleteBookById);
};
