const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../app'); 
const Sweet = require('../../models/sweet');
const User = require('../../models/user');
const { generateToken } = require('../../utils/jwt');

let mongoServer;
let userToken;
let adminToken;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
  
  // Create dummy users for future protected route tests
  const user = await User.create({
    username: 'testuser',
    email: 'user@example.com',
    password: 'password123',
    role: 'user'
  });
  
  const admin = await User.create({
    username: 'admin',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin'
  });
  
  
  userToken = generateToken({ userId: user._id, role: 'user' });
  adminToken = generateToken({ userId: admin._id, role: 'admin' });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Sweet.deleteMany({});
});

describe('GET /api/sweets', () => {
  test('should get all sweets', async () => {
    // Setup data
    await Sweet.create([
      { name: 'Chocolate Bar', category: 'Chocolate', price: 2.99, quantity: 100 },
      { name: 'Gummy Bears', category: 'Gummy', price: 1.99, quantity: 50 }
    ]);

    // Act
    const response = await request(app).get('/api/sweets');

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.count).toBe(2);
    expect(response.body.data).toHaveLength(2);
  });

  test('should return empty array when no sweets exist', async () => {
    const response = await request(app).get('/api/sweets');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.count).toBe(0);
    expect(response.body.data).toHaveLength(0);
  });
});