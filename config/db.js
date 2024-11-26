const mongoose = require('mongoose');

// Fungsi untuk menghubungkan ke MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Keluar dari aplikasi jika gagal terkoneksi ke DB
    }
};

module.exports = connectDB;