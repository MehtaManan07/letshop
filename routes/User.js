const express = require('express');
const router = express.Router();
const { userById } = require('../controllers/User');
const { requireLogin } = require('../controllers/Auth')

router.get('/secret/:userId', requireLogin, (req,res) => {
    res.json({
        user: req.profile
    })
})
router.param('userId', userById)

module.exports = router