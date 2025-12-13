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



describe('POST /api/sweets', () => {
  test('should create a sweet with valid data', async () => {
    // Arrange
    const sweetData = {
      name: 'Chocolate Bar',
      category: 'Chocolate',
      price: 2.99,
      quantity: 100,
      description: 'Delicious milk chocolate'
    };

    // Act
    const response = await request(app)
      .post('/api/sweets')
      .set('Authorization', `Bearer ${userToken}`)
      .send(sweetData);

    // Assert
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.name).toBe(sweetData.name);
  });

  test('should fail without authentication', async () => {
    // Arrange
    const payload = { name: 'Chocolate', category: 'Chocolate', price: 2.99 };

    // Act
    const response = await request(app)
      .post('/api/sweets')
      .send(payload);

    // Assert
    expect(response.status).toBe(401);
  });

  test('should fail with missing required fields', async () => {
    // Arrange
    const incompleteData = { name: 'Chocolate' };

    // Act
    const response = await request(app)
      .post('/api/sweets')
      .set('Authorization', `Bearer ${userToken}`)
      .send(incompleteData);

    // Assert
    expect(response.status).toBe(400);
  });

  test('should fail with negative price', async () => {
    // Arrange
    const invalidData = {
      name: 'Chocolate Bar',
      category: 'Chocolate',
      price: -5,
      quantity: 100
    };

    // Act
    const response = await request(app)
      .post('/api/sweets')
      .set('Authorization', `Bearer ${userToken}`)
      .send(invalidData);

    // Assert
    expect(response.status).toBe(400);
  });
});
