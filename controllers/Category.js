const Category = require("../models/Category");

exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((error, category) => {
    if (error || !category) {
      return res.status(400).json({ error: `category not found` });
    }
    req.category = category;
    next();
  });
};

exports.create = (req, res) => {
  const newCategory = new Category(req.body);
  newCategory.save((error, data) => {
    if (error) {
      return res.status(400).json({ error: `Error while creating a category` });
    }

    res.status(201).json({ data });
  });
};

exports.getCategoryById = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategories = (req, res) => {
  Category.find().exec((error, data) => {
    if (error) {
      res.status(400).json({ error: "No data found" });
    } 
    res.json({ count: data.length, data})
  });
};


exports.updateCategoryById = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((error, updatedCategory) => {
    if (error) {
      return res.status(400).json({
        error: "Category cannot not be updated",
      });
    }
    res.json({ updatedCategory });
  });
};

exports.deleteCategoryById = (req, res) => {
  const category = req.category;
  category.remove((error, deletedCategory) => {
    if (error) {
      return res.status(400).json({
        error: "Category cannot not be deleted",
      });
    }
    res.json({ deletedCategory });
  });
};
