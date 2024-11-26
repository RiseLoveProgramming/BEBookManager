const books = require('./booksArray');

function searchBook(title) {
    if (!title) {
        return {
            status: 400,
            success: false,
            message: 'Title is required'
        };
    }

    const foundBook = books.find(book => 
        book.title.toLowerCase().includes(title.toLowerCase())
    );

    if (!foundBook) {
        return {
            status: 404,
            success: false,
            message: 'Book not found'
        };
    }

    return {
        status: 200,
        success: true,
        message: 'Book found',
        data: foundBook
    };
}

module.exports = searchBook;