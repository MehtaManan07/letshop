const Category = require("../models/Category");

exports.create = (req, res, next) => {
  const newCategory = new Category(req.body);
  newCategory.save((error, data) => {
    if (error) {
      return res.status(400).json({ error: `Error while creating a category` });
    }

    res.status(201).json({ data });
  });
};
