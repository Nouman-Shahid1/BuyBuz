const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Import the cors middleware
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const app = express();

// Use CORS middleware
app.use(cors({
    origin: '*', // Allow all origins (can be restricted to specific origins)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));

app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
