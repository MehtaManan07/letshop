const express = require('express');
const { register, login } = require('../controllers/Users');
const { userSignupValidator } = require('../validators.js/auth');
const { runValidation } = require('../validators.js');
const router = express.Router()

router.post('/register', userSignupValidator, runValidation, register)
router.post('/login', userSignupValidator, runValidation, login)
module.exports = router