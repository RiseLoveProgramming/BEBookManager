const Book = require('../../models/Book');
const books = require('./booksArray');

function addBook(title, category, author, genre, price) {
    const newBook = new Book(title, category, author, genre, price);
    books.push(newBook);
    return "Book added successfully";
}

module.exports = addBook;