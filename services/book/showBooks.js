const books = require('./booksArray');

function showBooks() {
    return {
        status: 200,
        success: true,
        message: books.length > 0 ? 'Books retrieved successfully' : 'No books available',
        data: books,
        total: books.length
    };
}

module.exports = showBooks;