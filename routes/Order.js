const express = require("express");
const { userById } = require("../controllers/User");
const { isAuth, requireLogin } = require("../controllers/Auth");
const {
  createNewOrder,
  populateOrder,
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

router.param("userId", userById);
module.exports = router;
