const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes'); 
const sweetRoutes = require('./routes/sweetRoutes.js');
const { errorHandler, notFound } = require('./middleware/error');
const Sweet = require('./models/sweet');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetRoutes);

app.get('/favicon.ico', (req, res) => res.status(204).end());

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.use(notFound);
app.use(errorHandler);

// --- SEEDING FUNCTION (FORCE MODE) ---
const seedSweets = async () => {
  try {
    // 1. Log that we are starting
    console.log('🔄 Checking database...');

    // 2. Force Clear the collection (Fixes "phantom" data issues)
    await Sweet.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // 3. Define the sweets
    const initialSweets = [
      {
        name: 'Galaxy Silk',
        category: 'Chocolate',
        price: 2.50,
        quantity: 50,
        description: 'Smooth and silky milk chocolate bar.'
      },
      {
        name: 'Rainbow Gummy Bears',
        category: 'Gummy',
        price: 1.99,
        quantity: 100,
        description: 'Chewy and colorful fruit-flavored bears.'
      },
      {
        name: 'Mega Lollipop',
        category: 'Lollipop',
        price: 0.99,
        quantity: 200,
        description: 'Giant swirl lollipop with strawberry flavor.'
      },
      {
        name: 'Sour Worms',
        category: 'Gummy',
        price: 1.50,
        quantity: 75,
        description: 'Tangy sour worms that pack a punch.'
      },
      {
        name: 'Dark Truffles',
        category: 'Chocolate',
        price: 5.99,
        quantity: 30,
        description: 'Premium dark chocolate truffles with ganache.'
      },
      {
        name: 'Marshmallow Fluff',
        category: 'Marshmallow',
        price: 3.00,
        quantity: 40,
        description: 'Soft and fluffy vanilla marshmallows.'
      }
    ];

    // 4. Insert them
    await Sweet.insertMany(initialSweets);
    console.log('🍭 Database FORCIBLY Seeded with Initial Sweets!');
    
  } catch (error) {
    console.error('❌ Seeding Error:', error);
  }
};

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/sweet-shop';

  mongoose.connect(MONGO_URI)
    .then(() => {
      console.log('✅ MongoDB Connected');
      app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error('❌ Database connection error:', err);
      process.exit(1);
    });
}

module.exports = app;