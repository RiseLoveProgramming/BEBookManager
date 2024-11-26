const Book = require('../models/Book');

class BookController {
    // fungsi untuk menambahkan buku
    async addBook({ title, category, author, genre, price }) {
        try {
            if (!title || !category || !author || !genre || price === undefined) {
                return {
                    status: 400,
                    success: false,
                    message: 'All fields are required'
                };
            }

            // validasi price
            const numPrice = Number(price);
            if (isNaN(numPrice) || numPrice < 0) {
                return {
                    status: 400,
                    success: false,
                    message: 'Price must be a valid positive number'
                };
            }
            
            // validasi dengan title yang sama
            const existingBook = await Book.findOne({ title: title.trim() });
            if (existingBook) {
                return {
                    status: 409,
                    success: false,
                    message: 'Book with this title already exists'
                };
            }

            const newBook = new Book({
                title,
                category,
                author,
                genre,
                price: numPrice
            });

            await newBook.save();
            return {
                status: 201,
                success: true,
                message: 'Book added successfully',
                data: newBook
            };
        } catch (error) {
            return {
                status: 500,
                success: false,
                message: 'Failed to add book',
                error: error.message
            };
        }
    }

    // fungsi untuk menghapus buku
    async deleteBook({ title }) {
        try {
            if (!title) {
                return {
                    status: 400,
                    success: false,
                    message: 'Title is required'
                };
            }

            const result = await Book.deleteOne({ title });

            if (result.deletedCount === 0) {
                return {
                    status: 404,
                    success: false,
                    message: `Book with title "${title}" not found`
                };
            }

            return {
                status: 200,
                success: true,
                message: `Book with title "${title}" deleted successfully`
            };
        } catch (error) {
            console.error('Error during deletion:', error);
            return {
                status: 500,
                success: false,
                message: 'Failed to delete book',
                error: error.message
            };
        }
    }

    // Fungsi untuk mencari buku
    async searchBook({ title }) {
        try {
            if (!title) {
                return {
                    status: 400,
                    success: false,
                    message: 'Title is required'
                };
            }

            const foundBook = await Book.findOne({
                $text: { $search: title }
            });

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
        } catch (error) {
            return {
                status: 500,
                success: false,
                message: 'Failed to search book',
                error: error.message
            };
        }
    }

    // fungsi untuk menampilkan semua buku
    async showBooks() {
        try {
            const books = await Book.find().sort({ title: 1 });
            
            return {
                status: 200,
                success: true,
                message: books.length > 0 ? 'Books retrieved successfully' : 'No books available',
                data: books,
                total: books.length
            };
        } catch (error) {
            return {
                status: 500,
                success: false,
                message: 'Failed to retrieve books',
                error: error.message
            };
        }
    }

    // fungsi untuk mencari buku berdasarkan range harga
    async searchBookByPrice({ minPrice, maxPrice }) {
        try {
            const min = Number(minPrice) || 0;
            const max = Number(maxPrice) || Number.MAX_SAFE_INTEGER;

            if (isNaN(min) || isNaN(max)) {
                return {
                    status: 400,
                    success: false,
                    message: 'Invalid price range'
                };
            }

            const foundBooks = await Book.find({
                price: { $gte: min, $lte: max }
            }).sort({ price: 1 });

            return {
                status: 200,
                success: true,
                message: foundBooks.length > 0 
                    ? `Books found in price range: ${min} - ${max}`
                    : 'No books found in the specified price range',
                data: foundBooks,
                total: foundBooks.length
            };
        } catch (error) {
            return {
                status: 500,
                success: false,
                message: 'Failed to search books by price',
                error: error.message
            };
        }
    }
}

module.exports = new BookController();