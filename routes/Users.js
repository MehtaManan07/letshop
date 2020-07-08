const express = require('express');
const { test } = require('../controllers/Users');
const router = express.Router()

router.get('/', test)

module.exports = router