const express = require('express');
const cors = require('cors');

const app = express();

// Configure CORS for production
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5173', // Vite dev server
    'https://erp-module-2-8kbl.onrender.com' // Your frontend Render URL
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json()); // Body parser
const docketRoutes = require('./routes/docketRoutes');
app.use('/api/dockets', docketRoutes);
app.use('/api/invoices', require('./routes/invoiceRoutes'));
app.use('/api/outstanding', require('./routes/outstandingRoutes'));
app.use('/api/dispatch', require('./routes/dispatchRoutes'));
app.use('/api/receipt', require('./routes/receiptRoutes'));
app.use('/api/sales', require('./routes/salesRoutes'));




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
