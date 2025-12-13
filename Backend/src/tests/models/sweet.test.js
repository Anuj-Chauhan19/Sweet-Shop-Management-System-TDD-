const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Sweet = require('../../models/sweet');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  // Clear data after each test to ensure isolation
  await Sweet.deleteMany({});
});

describe('Sweet Model', () => {
  test('should create a sweet successfully', async () => {
    const sweetData = {
      name: 'Chocolate Bar',
      category: 'Chocolate',
      price: 2.99,
      quantity: 100,
      description: 'Delicious milk chocolate'
    };

    const sweet = await Sweet.create(sweetData);
    expect(sweet.name).toBe(sweetData.name);
    expect(sweet.category).toBe(sweetData.category);
    expect(sweet.price).toBe(sweetData.price);
    expect(sweet.quantity).toBe(sweetData.quantity);
  });

  test('should require name', async () => {
    const sweet = new Sweet({
      category: 'Chocolate',
      price: 2.99,
      quantity: 100
    });

    await expect(sweet.save()).rejects.toThrow();
  });

  test('should require category', async () => {
    const sweet = new Sweet({
      name: 'Chocolate Bar',
      price: 2.99,
      quantity: 100
    });

    await expect(sweet.save()).rejects.toThrow();
  });

  test('should require price', async () => {
    const sweet = new Sweet({
      name: 'Chocolate Bar',
      category: 'Chocolate',
      quantity: 100
    });

    await expect(sweet.save()).rejects.toThrow();
  });

  test('should not accept negative price', async () => {
    const sweet = new Sweet({
      name: 'Chocolate Bar',
      category: 'Chocolate',
      price: -5,
      quantity: 100
    });

    await expect(sweet.save()).rejects.toThrow();
  });

  test('should not accept negative quantity', async () => {
    const sweet = new Sweet({
      name: 'Chocolate Bar',
      category: 'Chocolate',
      price: 2.99,
      quantity: -10
    });

    await expect(sweet.save()).rejects.toThrow();
  });

  test('should default quantity to 0', async () => {
    const sweet = await Sweet.create({
      name: 'Chocolate Bar',
      category: 'Chocolate',
      price: 2.99
    });

    expect(sweet.quantity).toBe(0);
  });

  test('should have timestamps', async () => {
    const sweet = await Sweet.create({
      name: 'Chocolate Bar',
      category: 'Chocolate',
      price: 2.99,
      quantity: 100
    });

    expect(sweet.createdAt).toBeDefined();
    expect(sweet.updatedAt).toBeDefined();
  });
});