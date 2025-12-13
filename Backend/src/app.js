const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
// Ensure these paths match your actual file names from previous steps
const authRoutes = require('./routes/authRoutes'); 
const { errorHandler, notFound } = require('./middleware/error');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount Routes
app.use('/api/auth', authRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error Handling Middleware (Must be last)
app.use(notFound);
app.use(errorHandler);

module.exports = app;