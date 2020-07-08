const express = require('express');
const router = express.Router();
const { userById } = require('../controllers/User');
const { requireLogin, isAuth } = require('../controllers/Auth')

router.get('/secret/:userId', requireLogin, isAuth, (req,res) => {
    res.json({
        user: req.profile
    })
})
router.param('userId', userById)

module.exports = router