// Mengimpor dependensi
require('dotenv').config({ path: './vb.env' });

const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

// Middleware untuk parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to mongodb
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// .then(() => console.log("Connected to MongoDB"))
// .catch(err => console.error("Failed to connect to MongoDB", err));

// app.use((req, res, next) => {
//     console.log(`Incoming request: ${req.method} ${req.url}`);
//     console.log('Request headers:', req.headers);
//     console.log('Request body:', req.body);
//     next();
// });

app.use('/books', bookRoutes);

// menjalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
