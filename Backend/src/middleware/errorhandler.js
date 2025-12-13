const { errorHandler, notFound } = require('../../middleware/error'); // This doesn't exist yet

describe('Error Middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = { originalUrl: '/api/test' };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    next = jest.fn();
  });

  describe('notFound', () => {
    test('should create 404 error and call next', () => {
      notFound(req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(404);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
      expect(next.mock.calls[0][0].message).toContain('Not Found');
    });
  });

  describe('errorHandler', () => {
    test('should handle Mongoose CastError (Invalid ID) as 404', () => {
      const err = { name: 'CastError' };
      errorHandler(err, req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Resource not found'
      });
    });

    test('should handle Duplicate Key Error (11000) as 400', () => {
      const err = { code: 11000 };
      errorHandler(err, req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Duplicate field value entered'
      }));
    });

    test('should handle Validation Error as 400', () => {
      const err = {
        name: 'ValidationError',
        errors: {
          email: { message: 'Email is invalid' },
          password: { message: 'Password too short' }
        }
      };
      errorHandler(err, req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json.mock.calls[0][0].message).toContain('Email is invalid');
      expect(res.json.mock.calls[0][0].message).toContain('Password too short');
    });

    test('should default to 500 for unknown errors', () => {
      const err = { message: 'Something exploded' };
      errorHandler(err, req, res, next);
      
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Something exploded'
      });
    });
  });
});