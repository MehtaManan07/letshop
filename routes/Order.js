const express = require("express");
const { userById } = require("../controllers/User");
const { isAuth, requireLogin, isAdmin } = require("../controllers/Auth");
const {
  createNewOrder,
  populateOrder,
  listAllOrders,
  getStatusValues,
  orderById,
  updateOrderStatus,
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
router.get('/status-values/:userId', requireLogin, isAuth, isAdmin, getStatusValues)

router.put('/:orderId/status/:userId', requireLogin, isAuth, isAdmin, updateOrderStatus)

router.param("userId", userById);
router.param("orderId", orderById);
module.exports = router;
