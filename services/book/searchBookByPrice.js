const books = require('./booksArray');

function searchBookByPrice({ minPrice, maxPrice }) {
    // Convert input to numbers
    const min = Number(minPrice) || 0;
    const max = Number(maxPrice) || Number.MAX_SAFE_INTEGER;

    if (isNaN(min) || isNaN(max)) {
        return {
            status: 400,
            success: false,
            message: 'Invalid price range'
        };
    }

    const foundBooks = books.filter(book => {
        const bookPrice = Number(book.price);
        return bookPrice >= min && bookPrice <= max;
    });

    return {
        status: 200,
        success: true,
        message: foundBooks.length > 0 
            ? `Books found in price range: ${min} - ${max}`
            : 'No books found in the specified price range',
        data: foundBooks,
        total: foundBooks.length
    };
}

module.exports = searchBookByPrice;