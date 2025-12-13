const { verifyToken } = require('../utils/jwt');

const protect = async (req, res, next) => {
  let token;

  // Check for token in headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, no token'
    });
  }

  try {
    // Verify token
    const decoded = verifyToken(token);
    
    // Attach decoded user info to request
    // Ensure your JWT payload structure matches what you access here (e.g. decoded.id or decoded.user)
    req.user = decoded; 
    
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized, token failed'
    });
  }
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    // Check if the user's role is in the allowed roles array
    // Note: Ensure req.user.role exists (depends on how you signed the token)
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }
    next();
  };
};

module.exports = {
  protect,
  restrictTo
};