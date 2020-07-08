const express = require("express");
const router = express.Router();

const { create, categoryById, getCategoryById } = require("../controllers/Category");
const { requireLogin, isAdmin, isAuth } = require("../controllers/Auth");
const { userById } = require("../controllers/User");

router.get('/:categoryId', getCategoryById)
router.post("/create/:userId", requireLogin, isAuth, isAdmin, create);

router.param('userId', userById)
router.param('categoryId', getCategoryById)

module.exports = router