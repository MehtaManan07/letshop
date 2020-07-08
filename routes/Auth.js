const express = require('express');
const { register, login, logout, requireLogin } = require('../controllers/Auth');
const { userRegisterValidator, userSignInValidatior } = require('../validators.js/auth');
const { runValidation } = require('../validators.js/index.js');
const router = express.Router()

router.post('/register', userRegisterValidator, runValidation, register)
router.post('/login', login)
router.get('/logout' ,logout)
module.exports = router