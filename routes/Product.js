const express = require("express");
const router = express.Router();

const {
  create,
  productById,
  getProductById,
  deleteProductById,
  updateProductById,
  getAllProducts,
  getRelatedProducts,
  getCategories,
  listProductsBySearch,
  getpicture,
  listSearches,
} = require("../controllers/Product");
const { requireLogin, isAdmin, isAuth } = require("../controllers/Auth");
const { userById } = require("../controllers/User");

router.post("/search", listSearches);
router.get("/:productId", getProductById);
router.post("/create/:userId", requireLogin, isAuth, isAdmin, create);
router.delete(
  "/:productId/:userId",
  requireLogin,
  isAdmin,
  isAuth,
  deleteProductById
);
router.put(
  "/:productId/:userId",
  requireLogin,
  isAdmin,
  isAuth,
  updateProductById
);
router.get("/", getAllProducts);
router.get("/related/:productId", getRelatedProducts);
router.get("/categories", getCategories);
router.post('/by/search', listProductsBySearch)
router.get('/picture/:productId', getpicture)

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
