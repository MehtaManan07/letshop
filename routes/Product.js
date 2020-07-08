const express = require("express");
const router = express.Router();

const { create } = require("../controllers/Product");
const { requireLogin, isAdmin, isAuth } = require("../controllers/Auth");
const { userById } = require("../controllers/User");

router.post("/create/:userId", requireLogin, isAuth, isAdmin, create);

router.param('userId', userById)

module.exports = router