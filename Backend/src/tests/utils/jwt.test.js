const { generateToken, verifyToken } = require('../../utils/jwt.js');

describe('JWT Utils', () => {
  test('should generate a valid JWT token', () => {
    const payload = { userId: '123', role: 'user' };
    const token = generateToken(payload);
    
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
    expect(token.split('.').length).toBe(3);
  });

  test('should verify a valid token', () => {
    const payload = { userId: '123', role: 'user' };
    const token = generateToken(payload);
    const decoded = verifyToken(token);
    
    expect(decoded.userId).toBe(payload.userId);
    expect(decoded.role).toBe(payload.role);
  });

  test('should throw error for invalid token', () => {
    expect(() => verifyToken('invalid-token')).toThrow();
  });
});