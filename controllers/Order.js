const { Order, CartItem } = require("../models/Order");

exports.createNewOrder = (req, res) => {
  req.body.order.user = req.profile;
  const newOrder = new Order(req.body.order);
  newOrder.save((error, data) => {
    if (error) {
      console.log("NEW ORDER ERROR:", error);
      return res.status(400).json({ error: "Erro while creating new order" });
    }
    res.json(data)
  });
};
