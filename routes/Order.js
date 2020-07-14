const express = require("express");
const { userById } = require("../controllers/User");
const { isAuth, requireLogin } = require("../controllers/Auth");
const { createNewOrder } = require("../controllers/Order");
const router = express.Router();

router.post('/newOrder/:userId',requireLogin, isAuth, createNewOrder)

router.param('userId', userById)
module.exports = router