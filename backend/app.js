const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json()); // Body parser

// Routes
try {
    const authRoutes = require('./routes/authRoutes');
    app.use('/api/auth', authRoutes);
} catch (error) {
    console.error('Error loading authRoutes:', error.message);
}

// Health check route
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'ERP Backend Server is running',
        timestamp: new Date().toISOString()
    });
});

module.exports = app;
