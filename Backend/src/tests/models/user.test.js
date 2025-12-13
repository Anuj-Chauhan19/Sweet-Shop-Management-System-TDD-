const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../../models/user');

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
  await User.deleteMany({});
});

describe('User Model', () => {
  test('should create a user successfully', async () => {
    const userData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    };

    const user = await User.create(userData);
    expect(user.username).toBe(userData.username);
    expect(user.email).toBe(userData.email);
    expect(user.password).not.toBe(userData.password); // Password should be hashed
    expect(user.role).toBe('user'); // Default role
  });

  test('should hash password before saving', async () => {
    const user = new User({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });

    await user.save();
    expect(user.password).not.toBe('password123');
    expect(user.password.length).toBeGreaterThan(20);
  });

  test('should compare password correctly', async () => {
    const user = await User.create({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123'
    });

    const isMatch = await user.comparePassword('password123');
    expect(isMatch).toBe(true);

    const isNotMatch = await user.comparePassword('wrongpassword');
    expect(isNotMatch).toBe(false);
  });

  test('should require username', async () => {
    const user = new User({
      email: 'test@example.com',
      password: 'password123'
    });

    await expect(user.save()).rejects.toThrow();
  });

  test('should require unique email', async () => {
    await User.create({
      username: 'user1',
      email: 'test@example.com',
      password: 'password123'
    });

    const duplicateUser = new User({
      username: 'user2',
      email: 'test@example.com',
      password: 'password123'
    });

    await expect(duplicateUser.save()).rejects.toThrow();
  });
});