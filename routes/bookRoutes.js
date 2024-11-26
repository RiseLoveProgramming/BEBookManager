const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Middleware untuk validasi request
const validateRequest = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
};

// Tambah Buku
router.post('/add', validateRequest, async (req, res) => {
    const result = await bookController.addBook(req.body);
    res.status(result.status).json(result);
});

// Cari Buku
router.get('/search', validateRequest, async (req, res) => {
    const result = await bookController.searchBook(req.query);
    res.status(result.status).json(result);
});

// Hapus Buku
router.delete('/delete', async (req, res) => {
    try {
        const { title } = req.body; // Mengambil title dari body
        const result = await bookController.deleteBook({ title });
        res.status(result.status).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'An error occurred during book deletion'
        });
    }
});

// Tampilkan Semua Buku
router.get('/show', validateRequest, async (req, res) => {
    const result = await bookController.showBooks();
    res.status(result.status).json(result);
});

// Cari Buku Berdasarkan Harga
router.get('/search-by-price', validateRequest, async (req, res) => {
    const result = await bookController.searchBookByPrice(req.query);
    res.status(result.status).json(result);
});

// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 500,
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

module.exports = router;