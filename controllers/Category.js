const Category = require("../models/Category");

exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((error, category) => {
    if (error || !category) {
      return res.json({ error: `category not found` });
    }
    req.category = category;
    next();
  });
};

exports.getCategoryById = (req, res) => {
 return res.json(req.category);
};


exports.create = (req, res, next) => {
  const newCategory = new Category(req.body);
  newCategory.save((error, data) => {
    if (error) {
      return res.status(400).json({ error: `Error while creating a category` });
    }

    res.status(201).json({ data });
  });
};
