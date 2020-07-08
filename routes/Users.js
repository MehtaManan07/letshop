const express = require('express');
const { register } = require('../controllers/Users');
const router = express.Router()

router.post('/register', register)
router.get('/', (req,res) => {
    res.json({ 123: '123' })
})

module.exports = router