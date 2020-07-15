const { Order, CartItem } = require("../models/Order");
const Users = require("../models/Users");

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

  Users.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { history: history } },
    { new: true },
    (error, data) => {
      if (error) {
        return res
          .status(400)
          .json({ error: "Erro while updating user's purchase history" });
      }
      next()
    }
  );
};
