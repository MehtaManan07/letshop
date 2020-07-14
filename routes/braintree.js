const express = require('express');
const router = express.Router()
const { requireLogin, isAuth } = require('../controllers/Auth');
const { userById } = require('../controllers/User');
const { generateToken } = require('../controllers/Payment')

router.get('/braintree/getToken/:userId', requireLogin, isAuth, generateToken)

router.param('userId', userById)

module.exports = router