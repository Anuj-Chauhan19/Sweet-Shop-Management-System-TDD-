const { protect, restrictTo } = require('../../middleware/auth');
const { generateToken } = require('../../utils/jwt');

// Mock dependencies
const mockRequest = () => {
  return {
    headers: {},
    user: null
  };
};

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockNext = jest.fn();

describe('Auth Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = mockRequest();
    res = mockResponse();
    next = mockNext;
    jest.clearAllMocks();
  });

  describe('protect middleware', () => {
    test('should fail if no token provided', async () => {
      // Logic: Run middleware with empty headers
      await protect(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        success: false
      }));
      expect(next).not.toHaveBeenCalled();
    });

    test('should fail with invalid token', async () => {
      req.headers.authorization = 'Bearer invalid-token';
      
      await protect(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(401);
      expect(next).not.toHaveBeenCalled();
    });

    test('should succeed with valid token', async () => {
      // Create a real valid token using our util
      const token = generateToken({ userId: '123', role: 'user' });
      req.headers.authorization = `Bearer ${token}`;
      
      await protect(req, res, next);
      
      expect(req.user).toBeDefined();
      // Note: Our generateToken might verify differently depending on payload structure
      // Adjust expectation to match what your verifyToken returns
      expect(next).toHaveBeenCalled();
    });
  });

  describe('restrictTo middleware', () => {
    test('should allow access for authorized role', () => {
      req.user = { role: 'admin' };
      const middleware = restrictTo('admin');
      
      middleware(req, res, next);
      
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    test('should deny access for unauthorized role', () => {
      req.user = { role: 'user' };
      const middleware = restrictTo('admin');
      
      middleware(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(403);
      expect(next).not.toHaveBeenCalled();
    });
  });
});