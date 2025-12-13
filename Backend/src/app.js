const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes'); 
const sweetRoutes = require('./routes/sweetRoutes.js');
const { errorHandler, notFound } = require('./middleware/error');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetRoutes);



app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;