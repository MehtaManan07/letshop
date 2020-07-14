const express = require('express');
const router = express.Router()
const { requireLogin, isAuth } = require('../controllers/Auth');
const { userById } = require('../controllers/User');
const { generateToken, processPayment } = require('../controllers/Payment')

router.get('/braintree/getToken/:userId', requireLogin, isAuth, generateToken)
router.post('/braintree/payment/:userId', requireLogin, isAuth, processPayment)

router.param('userId', userById)

module.exports = router