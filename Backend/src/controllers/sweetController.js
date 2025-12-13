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


exports.createSweet = async (req, res, next) => {
  try {
    const sweet = await Sweet.create(req.body);
    
    res.status(201).json({
      success: true,
      data: sweet
    });
  } catch (error) {
    next(error);
  }
};

exports.searchSweets = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;
    
    let query = {};
    
    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }
    
    if (category) {
      query.category = category;
    }
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    
    const sweets = await Sweet.find(query).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: sweets.length,
      data: sweets
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!sweet) {
      return res.status(404).json({
        success: false,
        message: 'Sweet not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: sweet
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
