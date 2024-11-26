// models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        unique: true
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true,
        // enum: ['Fiction', 'Non-Fiction', 'Science', 'Technology', 'History', 'Others']
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
        trim: true
    },
    genre: {
        type: String,
        required: [true, 'Genre is required'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    }
}, {
    timestamps: true
});

// Menambahkan index untuk pencarian yang lebih efisien
bookSchema.index({ title: 'text' });
bookSchema.index({ price: 1 });

module.exports = mongoose.model('Book', bookSchema);