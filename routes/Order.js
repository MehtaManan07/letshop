const express = require("express");
const { userById } = require("../controllers/User");
const { isAuth, requireLogin, isAdmin } = require("../controllers/Auth");
const {
  createNewOrder,
  populateOrder,
  listAllOrders,
} = require("../controllers/Order");
const { updateQuantity } = require("../controllers/Product");
const router = express.Router();

router.post(
  "/newOrder/:userId",
  requireLogin,
  isAuth,
  populateOrder,
  updateQuantity,
  createNewOrder
);

router.get('/list/:userId', requireLogin, isAuth, isAdmin, listAllOrders)

router.param("userId", userById);
module.exports = router;
