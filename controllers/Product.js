const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Product = require("../models/product");
const { updateOne } = require("../models/product");
// const { errorHandler } = require("../helpers/dbErrorHandler");

exports.productById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err || !product) {
        console.log("PRODUCT NOT FOUND", err);
        return res.status(400).json({
          error: "Product not found",
        });
      }
      req.product = product;
      next();
    });
};
exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (error, fields, files) => {
    if (error) {
      return res.status(400).json({
        error: "Image cannot not be uploaded",
      });
    }
    const { name, description, price, category, quantity, shipping } = fields;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    let product = new Product(fields);

    if (files.picture) {
      if (files.picture.size > 10 ** 6) {
        return res.status(400).json({
          error: "Size of picture must be less than 1 mb",
        });
      }
      product.picture.data = fs.readFileSync(files.picture.path);
      product.picture.contentType = files.picture.type;
    }

    product.save((error, result) => {
      if (error) {
        console.log(error);
        return res.status(400).json({
          error,
        });
      }
      res.json(result);
    });
  });
};

exports.getProductById = (req, res) => {
  req.product.picture = undefined;
  res.json(req.product);
};

exports.deleteProductById = (req, res) => {
  let productId = req.product._id;
  Product.findByIdAndRemove(productId, (error, deletedProduct) => {
    if (error) {
      res.status(400).json({ error: "Erro while deleting the product" });
    } else {
      res.status(200).json({ message: `Product deleted successfully`, deletedProduct });
    }
  });
};

exports.updateProductById = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (error, fields, files) => {
    if (error) {
      return res.status(400).json({
        error: "picture cannot not be uploaded",
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
        error: "All fields are required",
      });
    }

    let product = req.product;
    product = _.extend(product, fields);

    if (files.picture) {
      if (files.picture.size > 10 ** 6) {
        return res.status(400).json({
          error: "Size of picture must be less than 1 mb",
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

exports.getAllProducts = (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Product.find()
    .select("-picture")
    .populate("category")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((error, data) => {
      if (error) {
        return res.status(400).json({ error: `Product(s) not found` });
      }
      res.json({ count: data.length, data });
    });
};

exports.getRelatedProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;
  console.log(limit);
  Product.find({ _id: { $ne: req.product }, category: req.product.category })
    .limit(limit)
    .populate("category", "_id name")
    .exec((error, data) => {
      if (error) {
        return res.status(400).json({ error: `Product(s) not found` });
      }
      res.json({ count: data.length, data });
    });
};

exports.getCategories = (req, res) => {
  Product.distinct("category", {}, (error, data) => {
    if (error) {
      return res.status(400).json({ error: `Categories not found` });
    }
    res.json({ count: data.length, data });
  });
};

/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what they need 9227193553
 */

exports.listProductsBySearch = (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log("findArgs", findArgs);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Product.find(findArgs)
    .select("-picture")
    .populate("category")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((error, data) => {
      if (error) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.json({
        size: data.length,
        data,
      });
    });
};

exports.getpicture = (req, res, next) => {
  if (req.product.picture.data) {
    res.set("Content-Type", req.product.picture.contentType);
    return res.send(req.product.picture.data);
  }
  next();
};

exports.listSearches = (req, res) => {
  // create query object to hold search value and category value
  const query = {};
  // assign search value to query.name
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: "i" };
    // assigne category value to query.category
    if (req.query.category && req.query.category != "All") {
      query.category = req.query.category;
    }
    // find the product based on query object with 2 properties
    // search and category
    Product.find(query, (err, products) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          err: ` error: errorHandler(err)`,
        });
      }
      res.json(products);
    }).select("-photo");
  }
  console.log("query:", query);
};

exports.updateQuantity = (req, res, next) => {
  let bulkOps = req.body.order.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  Product.bulkWrite(bulkOps, {}, (error, products) => {
    if (error) {
      return res.json({ error: `Could not update product` });
    }
    next();
  });
};
