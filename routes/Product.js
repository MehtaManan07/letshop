const express = require("express");
const router = express.Router();

const { create, productById, getProductById, deleteProductById } = require("../controllers/Product");
const { requireLogin, isAdmin, isAuth } = require("../controllers/Auth");
const { userById } = require("../controllers/User");

router.get('/:productId', getProductById)
router.post("/create/:userId", requireLogin, isAuth, isAdmin, create);
router.delete('/:productId/:userId', requireLogin, isAdmin, isAuth, deleteProductById)
router.put('/:productId/:userId', requireLogin, isAdmin, isAuth, updateProductById)

router.param('userId', userById)
router.param('productId', productById)

module.exports = router