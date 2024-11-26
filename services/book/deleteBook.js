const books = require('./booksArray');

function deleteBook(title) {
    if (!title) {
        return {
            status: 400,
            success: false,
            message: 'Title is required'
        };
    }

    const bookIndex = books.findIndex(book => 
        book.title.toLowerCase() === title.toLowerCase()
    );

    if (bookIndex === -1) {
        return {
            status: 404,
            success: false,
            message: 'Book not found'
        };
    }

    const deletedBook = books.splice(bookIndex, 1)[0];
    
    return {
        status: 200,
        success: true,
        message: 'Book deleted successfully',
        data: deletedBook
    };
}

module.exports = deleteBook;