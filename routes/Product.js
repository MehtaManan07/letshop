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
  listProductsBySearch,
  getpicture,
  listSearches,
  getProductsByCategory,
} = require("../controllers/Product");
const { requireLogin, isAdmin, isAuth } = require("../controllers/Auth");
const { userById } = require("../controllers/User");

router.get("/:productId", getProductById);
router.get("/", getAllProducts);
router.get("/related/:productId", getRelatedProducts);
router.get("/categories", getProductsByCategory);
router.get('/picture/:productId', getpicture)

router.post("/search", listSearches);
router.post("/create/",create);
router.post('/by/search', listProductsBySearch)

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

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
