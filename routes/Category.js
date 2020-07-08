const express = require("express");
const router = express.Router();

const { create, categoryById, getCategoryById, updateCategoryById, getAllCategories, deleteCategoryById } = require("../controllers/Category");
const { requireLogin, isAdmin, isAuth } = require("../controllers/Auth");
const { userById } = require("../controllers/User");

router.get('/', getAllCategories)
router.get('/:categoryId', getCategoryById)
router.post("/create/:userId", requireLogin, isAuth, isAdmin, create);
router.delete(
    "/:categoryId/:userId",
    requireLogin,
    isAdmin,
    isAuth,
    deleteCategoryById
  );
  router.put(
    "/:categoryId/:userId",
    requireLogin,
    isAdmin,
    isAuth,
    updateCategoryById
  );

router.param('userId', userById)
router.param('categoryId', categoryById)

module.exports = router