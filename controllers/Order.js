const { Order, CartItem } = require("../models/Order");
const User = require("../models/Users");

exports.orderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((error, order) => {
      if (error || !order) {
        return res.json({ error: `Order not found` });
      }
      req.order = order;
      next();
    });
};

exports.createNewOrder = (req, res) => {
  req.body.order.user = req.profile;
  const newOrder = new Order(req.body.order);
  newOrder.save((error, data) => {
    if (error) {
      console.log("NEW ORDER ERROR:", error);
      return res.status(400).json({ error: "Erro while creating new order" });
    }
    res.json(data);
  });
};

exports.populateOrder = (req, res, next) => {
  let history = [];
  req.body.order.products.forEach((item) => {
    history.push({
      _id: item._id,
      name: item.name,
      description: item.description,
      category: item.category,
      quantity: item.count,
      transaction_id: req.body.order.transaction_id,
      amount: req.body.order.amount,
    });
  });

  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { history } },
    { new: true },
    (error, data) => {
      if (error) {
        return res
          .status(400)
          .json({ error: "Erro while updating user's purchase history" });
      }
      next();
    }
  );
};

exports.listAllOrders = (req, res) => {
  Order.find()
    .populate("user")
    .sort("-createdAt")
    .exec((error, orders) => {
      if (error) {
        console.log("error:", error);
        return res
          .status(400)
          .json({ error: "Error while fetching all orders" });
      }
      res.json({ count: orders.length, orders });
    });
};

exports.getStatusValues = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

exports.updateOrderStatus = (req, res) => {
  let status = req.body.status;
  let orderId = req.params.orderId;
  console.log(req.params, req.body);

  Order.findById(orderId, (error, response) => {
    if (error || !response) {
      console.log(error);
      return res.status(400).json({
        error: "Error while updating status",
      });
    } else {
      response.status = status
    }
    response.save((error, updatedStatus) => {
      if (error) {
        console.log("Status UPDATE ERROR", error);
        return res.status(400).json({
          error: "status update failed",
        });
      } else {
        res.status(200).json(updatedStatus);
      }
    })
  });
};
// Order.update(
//   { _id: req.params.orderId },
//   { $set: status },
//   (err, order) => {
//     if (err) {
//       console.log(err)
//       return res.status(400).json({
//         error: 'Error while updating status'
//       });
//     }
//     console.log(order)
//     res.json(order);
//   }
// );
