const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Product = require("../models/product");
// const { errorHandler } = require("../helpers/dbErrorHandler");

exports.productById = (req,res,next,id) => {
  Product.findById(id).exec((error, product) => {
    if (error || !product) {
      return res.json({ error: `product not found` });
    }
    req.product = product;
    next()
  })
}

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (error, fields, files) => {
    if (error) {
      return res.status(400).json({
        error: "Image cannot not be uploaded",
      });
    }

    if (
      !fields.name ||
      !fields.description ||
      !fields.price ||
      !fields.category ||
      !fields.quantity ||
      !fields.shipping
  ) {
      return res.status(400).json({
          error: "All fields are required"
      });
  }

    let product = new Product(fields);

    if (files.picture) {
      if (files.picture.size > 10 ** 6) {
        return res.status(400).json({
          error: "Size of image must be less than 1 mb",
        });
      }
      product.picture.data = fs.readFileSync(files.picture.path);
      product.picture.contentType = files.picture.type;
    }

    product.save((error, result) => {
      if (error) {
        return res.status(400).json({
          error,
        });
      }
      res.json(result);
    });
  });
};

exports.getProductById = (req,res) => {
  req.product.picture = undefined;
  res.json(req.product)
}

exports.deleteProductById = (req,res) => {
  let product = req.product
  product.remove((error, deletedProduct) => {
    if (error) {
      return res.status(400).json({
        error: "Product cannot not be deleted",
      });
    }
    res.json({ deletedProduct })
  })
  res.json(req.product)
}