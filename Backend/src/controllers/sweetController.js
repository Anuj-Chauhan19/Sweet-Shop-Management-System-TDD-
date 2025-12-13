const Sweet = require('../models/sweet');


exports.getAllSweets = async (req, res, next) => {
  try {
    // Sort by newest first
    const sweets = await Sweet.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: sweets.length,
      data: sweets
    });
  } catch (error) {
    
    next(error);
  }
};